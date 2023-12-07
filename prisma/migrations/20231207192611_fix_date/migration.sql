/*
  Warnings:

  - You are about to drop the column `date_end` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `date_end`,
    DROP COLUMN `date_start`,
    ADD COLUMN `delivery_date` VARCHAR(191) NULL;
