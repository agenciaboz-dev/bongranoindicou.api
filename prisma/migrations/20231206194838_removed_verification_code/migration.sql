/*
  Warnings:

  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.
  - Made the column `verified` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `booked` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `verificationCode`,
    MODIFY `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `booked` BOOLEAN NOT NULL DEFAULT false;
