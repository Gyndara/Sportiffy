const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getVenue(req, res) {
    try {
        const respone = await prisma.venue_lapangan.findMany({
            include: {
                field: {
                    select: {
                        idField: true,
                        fieldName: true,
                        roomCategory: true,
                        fieldType: true,
                        fieldDescription: true,
                        rentalHours: true,
                        rentalPrice: true
                    },
                },
            },
        });
        
        return res.status(200).json(respone);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

async function getVenueById(req, res) {
    try {
        const respone = await prisma.venue_lapangan.findUnique({
            where: {
                idVenue: Number(req.params.idVenue)
            },
            include: {
                field: {
                    select: {
                        idField: true,
                        fieldName: true,
                        roomCategory: true,
                        fieldType: true,
                        fieldDescription: true,
                        rentalHours: true,
                        rentalPrice: true
                    },
                },
            },
        });
        return res.status(200).json(respone);
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
};

async function createVenue(req, res) {
    const { venueCategory, administrator, venueName, address, linkAddress, facility, priceRange, openingSchedule, image, accountNumber } = req.body;
    // if (req.user.kategori_user === 'USER') {
    //     return res.status(403).json({ message: 'Insufficient permissions' });
    // }
    // console.log (req.body)
    try {
        const venue = await prisma.venue_lapangan.create({
            data: {
                venueCategory: venueCategory,
                administrator: administrator,
                venueName: venueName,
                address: address,
                linkAddress: linkAddress,
                facility: facility,
                priceRange: priceRange,
                openingSchedule: openingSchedule,
                image: image,
                accountNumber: accountNumber
            },
        });

        const field = await prisma.field_lapangan.create({
            data: {
                idVenue: venue["idVenue"],
                fieldName: "",
                roomCategory: "",
                fieldType: "",
                fieldDescription: "",
                rentalHours: "",
                rentalPrice: ""
            },
        });
        return res.status(201).json([venue, field]);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

async function updateVenue(req, res) {
    // if (req.user.kategori_user === 'USER') 
    // {
    //     return res.status(403).json({ message: 'Insufficient permissions' });
    // }
    try {
        const { venueCategory, administrator, venueName, address, linkAddress, facility, priceRange, openingSchedule, image, accountNumber } = req.body;
        const updatedVenue = await prisma.venue_lapangan.update({
            where: {
                idVenue: Number(req.params.idVenue)
            },
            data: {
                venueCategory,
                administrator,
                venueName,
                address,
                linkAddress,
                facility,
                priceRange,
                openingSchedule,
                image,
                accountNumber
            }
        });
        return (res.status(200).json(updatedVenue))
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

async function deleteVenue(req, res) {
    // if (req.user.kategori_user === 'USER') {
    //     return res.status(403).json({ message: 'Insufficient permissions' });
    // }
    try {
        const venue_lapangan = await prisma.venue_lapangan.delete({
            where: {
                idVenue: Number(req.params.idVenue)
            }
        });
        return res.status(200).json(venue_lapangan);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    createVenue,
    deleteVenue,
    getVenue,
    getVenueById,
    updateVenue
}