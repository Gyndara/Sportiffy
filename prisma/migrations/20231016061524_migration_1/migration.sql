-- CreateTable
CREATE TABLE `users` (
    `id_user` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notelp` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `kategori_user` ENUM('USER', 'PATNER', 'ADMIN') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venue_lapangan` (
    `id_venue` INTEGER NOT NULL,
    `kategori_venue` VARCHAR(191) NOT NULL,
    `pengelola` VARCHAR(191) NOT NULL,
    `nama_venue` VARCHAR(191) NOT NULL,
    `alamat_venue` VARCHAR(191) NOT NULL,
    `link_maps` VARCHAR(191) NOT NULL,
    `fasilitas` VARCHAR(191) NOT NULL,
    `kisaran_harga` VARCHAR(191) NOT NULL,
    `jadwal_buka_tutup` VARCHAR(191) NOT NULL,
    `foto_venue` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `venue_lapangan_id_venue_key`(`id_venue`),
    PRIMARY KEY (`id_venue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field_lapangan` (
    `id_field` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venue` INTEGER NOT NULL,
    `nama_venue` VARCHAR(191) NOT NULL,
    `alamat_venue` VARCHAR(191) NOT NULL,
    `kategori_vanue` VARCHAR(191) NOT NULL,
    `deskripsi_venue` VARCHAR(191) NOT NULL,
    `kategori_ruangan` VARCHAR(191) NOT NULL,
    `jenis_lapangan` VARCHAR(191) NOT NULL,
    `deskripsi_jenis_lapangan` VARCHAR(191) NOT NULL,
    `jam_sewa` VARCHAR(191) NOT NULL,
    `harga_sewa` VARCHAR(191) NOT NULL,
    `foto_venue` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `field_lapangan_id_field_key`(`id_field`),
    PRIMARY KEY (`id_field`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_lapangan` (
    `no_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notelp` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `id_venue` INTEGER NOT NULL,
    `nama_venue` VARCHAR(191) NOT NULL,
    `kategori_venue` VARCHAR(191) NOT NULL,
    `alamat_venue` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`no_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `no_transaksi` INTEGER NOT NULL,
    `metode_pembayaran` VARCHAR(191) NOT NULL,
    `nama_pengirim` VARCHAR(191) NOT NULL,
    `bukti_transfer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nama_pengirim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tracking_booking` (
    `no_transaksi` INTEGER NOT NULL,
    `status_booking` ENUM('PAID', 'NOT_PAID') NOT NULL DEFAULT 'NOT_PAID',

    PRIMARY KEY (`status_booking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `id_history` VARCHAR(191) NOT NULL,
    `nama_pengirim` VARCHAR(191) NOT NULL,
    `nama_venue` VARCHAR(191) NOT NULL,
    `alamat_venue` VARCHAR(191) NOT NULL,
    `kategori_venue` VARCHAR(191) NOT NULL,
    `harga_sewa` VARCHAR(191) NOT NULL,
    `jam_sewa` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_history`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `field_lapangan` ADD CONSTRAINT `field_lapangan_id_venue_fkey` FOREIGN KEY (`id_venue`) REFERENCES `venue_lapangan`(`id_venue`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_id_venue_fkey` FOREIGN KEY (`id_venue`) REFERENCES `venue_lapangan`(`id_venue`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_no_transaksi_fkey` FOREIGN KEY (`no_transaksi`) REFERENCES `booking_lapangan`(`no_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking_booking` ADD CONSTRAINT `tracking_booking_no_transaksi_fkey` FOREIGN KEY (`no_transaksi`) REFERENCES `booking_lapangan`(`no_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
