const { PrismaClient } = require ("@prisma/client");

const prisma = new PrismaClient();

async function getHistory (req, res) {
    try {
        const respone = await prisma.history.findMany({
            select: {
                idHistory: true,
                track: {
                    select: {
                        idTracking: true,
                        paymentProgress: true,
                        bayar: {
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
                                                        facility: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }  
                            }
                        }
                    }
                }
            }        
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

async function getHistoryById (req, res) {
    try {
        const respone = await prisma.history.findUnique({
            where: {
                id_history: Number(req.params.id_history)
            },
            select: {
                idHistory: true,
                track: {
                    select: {
                        idTracking: true,
                        paymentProgress: true,
                        bayar: {
                            select: {
                                idPayement: true,
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
                                }
                            }
                        }
                    }
                }
            }        
        });
        res.status(200).json(respone);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

async function createHistory (req, res) {
    const{ idTracking } = req.body;
    try {
        const trackData = await prisma.tracking_booking.findUnique({
          where: {
            idTracking: idTracking
          }
    });
    if (!trackData) {
        res.status(404).json({ msg: 'booking not paid yet....' });
        return;
    }
    const history = await prisma.history.create({
        data: {
            idTracking: trackData.idTracking
        }
    });
        res.status(201).json(history);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

async function deleteHistory (req, res) {
    try {
        const history = await prisma.history.delete({
            where:{
                idHistory: Number (req.params.idHistory)
            }
        });
        res.status(200).json(history);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    getHistory,
    getHistoryById,
    createHistory,
    deleteHistory
}