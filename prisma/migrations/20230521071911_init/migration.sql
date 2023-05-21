-- CreateTable
CREATE TABLE `Sell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `typeCode` VARCHAR(191) NOT NULL,
    `typeName` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `reutersCode` VARCHAR(191) NOT NULL,
    `nationCode` VARCHAR(191) NULL,
    `nationName` VARCHAR(191) NULL,
    `sellPrice` DOUBLE NOT NULL,
    `quantity` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sell` ADD CONSTRAINT `Sell_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
