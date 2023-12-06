/*
  Warnings:

  - You are about to drop the column `date` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `date`,
    ADD COLUMN `date_end` VARCHAR(191) NULL,
    ADD COLUMN `date_start` VARCHAR(191) NULL;
