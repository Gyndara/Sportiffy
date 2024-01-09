const { PrismaClient } = require ("@prisma/client");

const prisma = new PrismaClient();

async function getTrackingBooking (req, res) {
    try {
        const respone = await prisma.tracking_booking.findMany({
            select: {
                idTracking: true,
                paymentProgress: true,
                bayar: {
                    select: {
                        paymentMethod: true,
                        customer: true,
                        evidence: true,
                        booking: {
                            select: {
                                transaction: true,
                                dateTime: true,
                            },
                            select: {
                                user: {
                                    select: {
                                        username: true,
                                        email: true,
                                        notelp: true
                                    }
                                },
                                field: {
                                    select: {
                                        fieldName: true,
                                        roomCategory: true,
                                        fieldType: true,
                                        rentalHours: true,
                                        rentalPrice: true,
                                        venue: {
                                            select: {
                                                administrator: true,
                                                venueName: true,
                                                address: true,
                                                venueCategory: true,
                                                facility: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },
            
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

async function getTrackingBookingById (req, res) {
    try {
        const respone = await prisma.tracking_booking.findUnique({
            where: {
                id_tracking: Number(req.params.id_tracking)
            },
            select: {
                idTracking: true,
                paymentProgress: true,
                bayar: {
                    select: {
                        paymentProgress: true,
                        customer: true,
                        evidence: true,
                        booking: {
                            select: {
                                transaction: true,
                                dateTime: true,
                            },
                            select: {
                                user: {
                                    select: {
                                        username: true,
                                        email: true,
                                        notelp: true
                                    }
                                },
                                field: {
                                    select: {
                                        fieldName: true,
                                        roomCategory: true,
                                        fieldType: true,
                                        rentalHours: true,
                                        rentasPrice: true,
                                        venue: {
                                            select: {
                                                administrator: true,
                                                venueName: true,
                                                address: true,
                                                venueCategpry: true,
                                                facility: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

async function createTrackingBooking (req, res) {
    const { idPayment, paymentProgress } = req.body;
    try {
        const pembayaranData = await prisma.pembayaran.findUnique({
            where: {
                idPayment: idPayment 
                }
            });
            if (!pembayaranData){
                response.status(404).json({ msg: 'payment tidak ditemukan' });
                return;
            }
            const tracking = await prisma.tracking_booking.create({
                data: {
                    idPayment: idPayment,
                    paymentProgress: paymentProgress
                },
            });
        res.status(201).json(tracking);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

async function updateTrackingBooking (req, res) {
    const { paymentProgress } = req.body;
    try {
        const trackingBooking = await prisma.tracking_booking.update({
            where: {
                idTracking: Number(req.params.idTracking)
            },
            data: {
                paymentProgress: paymentProgress,
            }
        });

        if (paymentProgress == 'PAID') {
            const history = await prisma.history.create({
                data: {
                    idTracking: Number(trackingBooking["idTracking"])
                }
            })
        }
        return res.status(200).json(trackingBooking);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

async function deleteTrackingBooking (req, res) {
    try {
        const tracking_booking = await prisma.tracking_booking.delete({
            where: {
                idTracking: Number(req.params.idTracking)
            }
        });
        res.status(200).json(tracking_booking);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports={
    getTrackingBooking,
    getTrackingBookingById,
    createTrackingBooking,
    updateTrackingBooking,
    deleteTrackingBooking
}
