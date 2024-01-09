/*
  Warnings:

  - You are about to drop the column `id_venue` on the `booking_lapangan` table. All the data in the column will be lost.
  - You are about to alter the column `id_user` on the `booking_lapangan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_history` on the `history` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_user` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[id_field]` on the table `field_lapangan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_pembayaran]` on the table `pembayaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metode_pembayaran` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking_lapangan` DROP FOREIGN KEY `booking_lapangan_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `booking_lapangan` DROP FOREIGN KEY `booking_lapangan_id_venue_fkey`;

-- AlterTable
ALTER TABLE `booking_lapangan` DROP COLUMN `id_venue`,
    MODIFY `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `field_lapangan` MODIFY `id_field` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `history` DROP PRIMARY KEY,
    ADD COLUMN `metode_pembayaran` VARCHAR(191) NOT NULL,
    MODIFY `id_history` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_history`);

-- AlterTable
ALTER TABLE `pembayaran` MODIFY `id_pembayaran` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_user`);

-- AlterTable
ALTER TABLE `venue_lapangan` MODIFY `id_venue` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `field_lapangan_id_field_key` ON `field_lapangan`(`id_field`);

-- CreateIndex
CREATE UNIQUE INDEX `pembayaran_id_pembayaran_key` ON `pembayaran`(`id_pembayaran`);

-- CreateIndex
CREATE UNIQUE INDEX `users_id_user_key` ON `users`(`id_user`);

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
