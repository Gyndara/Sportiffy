const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getBooking(req, res) {
    try {
        const respone = await prisma.booking_lapangan.findMany({
            include: {
                user: {
                    select:{
                        id_user: true,
                        username: true,
                        email: true,
                        notelp: true
                    }
                },
                field: {
                    include: {
                        venue: {
                            select:{
                            venueCategory: true,
                            administrator: true,
                            venueName: true,
                            address: true,
                            linkAddress: true,
                            facility: true
                            }
                        },
                    },
                },
            },
        });
        return res.status(200).json(respone);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

async function getBookingById(req, res) {
    try {
        const respone = await prisma.booking_lapangan.findUnique({
            where:{
                transaction: Number (req.params.transaction)
            },
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                        email: true,
                        notelp: true
                    }
                },
                field: {
                    include: {
                        venue: {
                            select: {
                            venueCategory: true,
                            administrator: true,
                            venueName: true,
                            address: true,
                            linkAddress: true,
                            facility: true
                            }
                        },
                    },
                },
            },
        });
        return res.status(200).json(respone);
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
}

async function createBooking(req, res) {
    const { id_user, idField, dateTime} = req.body;
    
    try {
        const userData = await prisma.users.findUnique({
            where: {
                id_user: id_user
            },
            select: {
                id_user: true,
                username: true,
                email: true,
                notelp: true
            }
        });
        const fieldData = await prisma.field_lapangan.findUnique({
            where: {
                idField: idField
            },
            select: {
                idField: true,
                idVenue: true,
                fieldName: true,
                rentalPrice: true,
                rentalHours: true
            }
        });
        if (!fieldData && !userData) {
            res.status(404).json({ msg: 'user dan venue tidak ditemukan' });
            return;
        }

        const booking =  await prisma.booking_lapangan.create({
            data: {
                dateTime: dateTime,
                id_user: id_user,
                idField: idField
            },
        });

        const payment = await prisma.pembayaran.create({
            data: {
                transaction: booking["transaction"],
                paymentMethod: "Tunai",
                customer: "",
                evidence: ""
            }
        });

        const tracking = await prisma.tracking_booking.create({
          data: {
            idPayment: payment["idPayment"],
            paymentProgress: "NOT_PAID"
          }  
        });
        res.status(201).json({booking, payment, tracking});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

async function updateBooking(req, res) {
    const { dateTime } = req.body
    try {
        const updateBooking = await prisma.booking_lapangan.update({
            where: {
                transaction: Number (req.params.transaction)
            },
            data: {
                dateTime: dateTime
            }
        });
        res.status(200).json(updateBooking);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

async function deleteBooking(req, res) {
    try {
        const booking_lapangan =  await  prisma.booking_lapangan.delete({
            where: {
                transaction: Number (req.params.transaction)
            }
        });
        res.status(200).json(booking_lapangan);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports={
    getBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}
