const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function getField(req, res) {
  try {
    const respone = await prisma.field_lapangan.findMany({
      include: {
        venue: {
          select: {
            idVenue: true,
            venueName: true,
            address: true,
            linkAddress: true,
            venueCategory: true,
            facility: true,
            image: true
          },
        },
      },
    });
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

async function getFieldById(req, res) {
  try {
    const respone = await prisma.field_lapangan.findUnique({
      where: {
        idField: Number(req.params.idField)
      },
      include: {
        venue: {
          select: {
            idVenue: true,
            venueName: true,
            address: true,
            linkAddress: true,
            venueCategory: true,
            facility: true,
            image: true
          },
        },
      },
    });
    res.status(200).json(respone);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

async function createField(req, res) {
  const { idVenue, fieldName, roomCategory, fieldType, fieldDescription, rentalHours, rentalPrice } = req.body;
  // if (req.user.kategori_user === 'USER')
  // {
  //   return res.status(403).json({ message: 'Insufficient permissions' });
  // }
  try {
    // Ambil data dari tabel "venue_lapangan" berdasarkan id_venue
    const venueData = await prisma.venue_lapangan.findUnique({
      where: {
        idVenue: idVenue,
      },
      select: {
          idVenue: true,
          venueName: true,
          address: true,
          linkAddress: true,
          venueCategory: true,
          facility: true,
          image: true
      },
    });

    if (!venueData) {
      res.status(404).json({ msg: 'Venue tidak ditemukan' });
      return;
    }
    // Buat data baru dalam tabel "field_lapangan" dengan atribut yang diisi dan dari "venue_lapangan"
    const field = await prisma.field_lapangan.create({
      data: {
        idVenue: venueData.idVenue,
        fieldName: fieldName,
        roomCategory: roomCategory,
        fieldType: fieldType,
        fieldDescription: fieldDescription,
        rentalHours: rentalHours,
        rentalPrice: rentalPrice
      },
    });
    res.status(201).json(field);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


async function updateField(req, res) {
  const { roomCategory, fieldName,fieldType, fieldDescription, rentalHours, rentalPrice } = req.body;
  // if (req.user.kategori_user === 'USER') 
  // {
  //   return res.status(403).json({ message: 'Insufficient permissions' });
  // }
  try {
    const updatedField = await prisma.field_lapangan.update({
      where: {
        idField: Number(req.params.idField)
      },
      data: {
        fieldName: fieldName,
        roomCategory: roomCategory,
        fieldType: fieldType,
        fieldDescription: fieldDescription,
        rentalHours: rentalHours,
        rentalPrice: rentalPrice
      }
    });
    res.status(200).json(updatedField);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

async function deleteField(req, res) {
  // if (req.user.kategori_user === 'USER') {
  //   return res.status(403).json({ message: 'Insufficient permissions' });
  // }
  try {
    const field_lapangan = await prisma.field_lapangan.delete({
      where: {
        idField: Number(req.params.idField)
      }
    });
    res.status(200).json(field_lapangan);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getField,
  getFieldById,
  createField,
  updateField,
  deleteField
}