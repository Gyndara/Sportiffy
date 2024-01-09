/*
  Warnings:

  - The primary key for the `pembayaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `metode_pembayaran` on the `pembayaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - The primary key for the `tracking_booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `no_transaksi` on the `tracking_booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no_transaksi]` on the table `booking_lapangan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_history]` on the table `history` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `harga_sewa` to the `booking_lapangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_field` to the `booking_lapangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_sewa` to the `booking_lapangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bukti_transfer` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tracking` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notelp` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat_venue` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga_sewa` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_pembayaran` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_sewa` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori_venue` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_venue` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notelp` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat_venue` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bukti_transfer` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga_sewa` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_pembayaran` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tracking` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_sewa` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori_venue` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metode_pembayaran` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_pengirim` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_venue` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notelp` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `tracking_booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tracking_booking` DROP FOREIGN KEY `tracking_booking_no_transaksi_fkey`;

-- DropIndex
DROP INDEX `field_lapangan_id_field_key` ON `field_lapangan`;

-- AlterTable
ALTER TABLE `booking_lapangan` ADD COLUMN `harga_sewa` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_field` INTEGER NOT NULL,
    ADD COLUMN `jam_sewa` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `field_lapangan` MODIFY `id_field` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `history` ADD COLUMN `bukti_transfer` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_tracking` INTEGER NOT NULL,
    ADD COLUMN `notelp` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pembayaran` DROP PRIMARY KEY,
    ADD COLUMN `alamat_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `harga_sewa` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_pembayaran` INTEGER NOT NULL,
    ADD COLUMN `jam_sewa` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategori_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `notelp` INTEGER NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `metode_pembayaran` ENUM('Paylater', 'CreditCard', 'Transfer', 'Tunai') NOT NULL DEFAULT 'Tunai',
    ADD PRIMARY KEY (`id_pembayaran`);

-- AlterTable
ALTER TABLE `tracking_booking` DROP PRIMARY KEY,
    DROP COLUMN `no_transaksi`,
    ADD COLUMN `alamat_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `bukti_transfer` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `harga_sewa` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_pembayaran` INTEGER NOT NULL,
    ADD COLUMN `id_tracking` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `jam_sewa` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategori_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `metode_pembayaran` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_pengirim` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_venue` VARCHAR(191) NOT NULL,
    ADD COLUMN `notelp` INTEGER NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_tracking`);

-- CreateIndex
CREATE UNIQUE INDEX `booking_lapangan_no_transaksi_key` ON `booking_lapangan`(`no_transaksi`);

-- CreateIndex
CREATE UNIQUE INDEX `history_id_history_key` ON `history`(`id_history`);

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_id_field_fkey` FOREIGN KEY (`id_field`) REFERENCES `field_lapangan`(`id_field`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking_booking` ADD CONSTRAINT `tracking_booking_id_pembayaran_fkey` FOREIGN KEY (`id_pembayaran`) REFERENCES `pembayaran`(`id_pembayaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_id_tracking_fkey` FOREIGN KEY (`id_tracking`) REFERENCES `tracking_booking`(`id_tracking`) ON DELETE RESTRICT ON UPDATE CASCADE;
