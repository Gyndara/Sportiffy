const { PrismaClient, status, metode } =  require ("@prisma/client");

const prisma = new PrismaClient();

async function getPayment (req, res) {
    try {
        const respone =  await prisma.pembayaran.findMany({
            select: {
                idPayment: true,
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
                                        facility: true,
                                        accountNumber: true
                                    }
                                }
                            }
                        }
                    }
                },
            },
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

async function getPaymentById (req, res) {
    try {
        const respone = await prisma.pembayaran.findUnique({
            where: {
                id_pembayaran: Number(req.params.id_pembayaran)
            },
            select: {
                idPayment: true,
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
                                        facility: true,
                                        accountNumber: true
                                    }
                                }
                            }
                        }
                    }
                },
            },
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

async function createPayment (req, res) {
    const { transaction, paymentMethod, customer, evidence } =  req.body
    try {
        const bookingData = await prisma.booking_lapangan.findUnique({
            where: {
                transaction: transaction
            }
        });
        if (!bookingData){
            res.status(404).json({ msg: 'booking tidak ditemukan' });
            return;
        }
        const pembayaran = await prisma.pembayaran.create({
          data: {
            transaction: transaction,
            customer: customer,  
            paymentMethod: paymentMethod,
            evidence: evidence
          },  
        });
        res.status(201).json(pembayaran);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function updatePayment(req, res) {
    const { paymentMethod, customer, evidence } = req.body;
    try {
        const pembayaran = await prisma.pembayaran.update({
            where:{
                idPayment: Number (req.params.idPayment)
            },
            data:{
                paymentMethod: paymentMethod,
                customer: customer,
                evidence: evidence
            }
        });
        if(evidence && paymentMethod != "Tunai") {
            const trackingData = await prisma.tracking_booking.findFirst({
                where: {
                    idPayment: Number(pembayaran['idPayment'])
                }, orderBy: {
                    idTracking: 'desc'
                }
            })
            const tracking = await prisma.tracking_booking.update({
                where: {
                    idTracking: Number(trackingData["idTracking"])
                },
                data: {
                    paymentProgress: "PAID"
                }
            });
            const history = await prisma.history.create({
                data: {
                    idTracking: Number(tracking["idTracking"])
                }
            })
        }
        return res.status(201).json(pembayaran);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }   
}

async function deletePayment(req, res) {
    try {
        const pembayaran = await prisma.pembayaran.delete({
            where: {
                idPayment: Number (req.params.idPayment)
            }
        });
        return res.status(200).json(pembayaran);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

module.exports={
    getPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}