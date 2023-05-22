/*
  Warnings:

  - Added the required column `priceGap` to the `Sell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sell` ADD COLUMN `priceGap` DOUBLE NOT NULL;
