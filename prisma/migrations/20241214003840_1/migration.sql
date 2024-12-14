-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notelp` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_id_user_key`(`id_user`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_roles_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roles` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `approval` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `partner_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venue_lapangan` (
    `idVenue` INTEGER NOT NULL AUTO_INCREMENT,
    `venueCategory` VARCHAR(191) NOT NULL,
    `administrator` VARCHAR(191) NOT NULL,
    `venueName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `linkAddress` VARCHAR(191) NOT NULL,
    `facility` VARCHAR(191) NOT NULL,
    `priceRange` VARCHAR(191) NOT NULL,
    `openingSchedule` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `accountNumber` INTEGER NOT NULL,

    UNIQUE INDEX `venue_lapangan_idVenue_key`(`idVenue`),
    PRIMARY KEY (`idVenue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field_lapangan` (
    `idField` INTEGER NOT NULL AUTO_INCREMENT,
    `idVenue` INTEGER NOT NULL,
    `fieldName` VARCHAR(191) NOT NULL,
    `roomCategory` VARCHAR(191) NOT NULL,
    `fieldType` VARCHAR(191) NOT NULL,
    `fieldDescription` VARCHAR(191) NOT NULL,
    `rentalHours` VARCHAR(191) NOT NULL,
    `rentalPrice` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `field_lapangan_idField_key`(`idField`),
    PRIMARY KEY (`idField`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_lapangan` (
    `transaction` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `dateTime` DATETIME(3) NOT NULL,
    `idField` INTEGER NOT NULL,

    UNIQUE INDEX `booking_lapangan_transaction_key`(`transaction`),
    PRIMARY KEY (`transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `idPayment` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction` INTEGER NOT NULL,
    `paymentMethod` ENUM('Transfer', 'Tunai') NOT NULL DEFAULT 'Tunai',
    `customer` VARCHAR(191) NOT NULL,
    `evidence` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pembayaran_idPayment_key`(`idPayment`),
    PRIMARY KEY (`idPayment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tracking_booking` (
    `idTracking` INTEGER NOT NULL AUTO_INCREMENT,
    `idPayment` INTEGER NOT NULL,
    `paymentProgress` ENUM('PAID', 'NOT_PAID') NOT NULL DEFAULT 'NOT_PAID',

    PRIMARY KEY (`idTracking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `idHistory` INTEGER NOT NULL AUTO_INCREMENT,
    `idTracking` INTEGER NOT NULL,

    UNIQUE INDEX `history_idHistory_key`(`idHistory`),
    PRIMARY KEY (`idHistory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner` ADD CONSTRAINT `partner_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `field_lapangan` ADD CONSTRAINT `field_lapangan_idVenue_fkey` FOREIGN KEY (`idVenue`) REFERENCES `venue_lapangan`(`idVenue`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_idField_fkey` FOREIGN KEY (`idField`) REFERENCES `field_lapangan`(`idField`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_lapangan` ADD CONSTRAINT `booking_lapangan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_transaction_fkey` FOREIGN KEY (`transaction`) REFERENCES `booking_lapangan`(`transaction`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tracking_booking` ADD CONSTRAINT `tracking_booking_idPayment_fkey` FOREIGN KEY (`idPayment`) REFERENCES `pembayaran`(`idPayment`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_idTracking_fkey` FOREIGN KEY (`idTracking`) REFERENCES `tracking_booking`(`idTracking`) ON DELETE CASCADE ON UPDATE CASCADE;
