-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `register_date` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `certificateId` INTEGER NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_document_key`(`document`),
    UNIQUE INDEX `Customer_certificateId_key`(`certificateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DigitalCertificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expiry` VARCHAR(191) NOT NULL,
    `certificate` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ncm` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `iine` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `adjunct` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `Company_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Natureza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `finality` VARCHAR(191) NOT NULL,
    `motive` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regraTributacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uf` VARCHAR(191) NOT NULL,
    `icms` VARCHAR(191) NOT NULL,
    `cfop` VARCHAR(191) NOT NULL,
    `percentage` VARCHAR(191) NOT NULL,
    `motive` VARCHAR(191) NOT NULL,
    `rate` VARCHAR(191) NOT NULL,
    `deferral` VARCHAR(191) NOT NULL,
    `cst` VARCHAR(191) NOT NULL,
    `cofins` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ie` VARCHAR(191) NOT NULL,
    `nifr` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `adjunct` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `exploration` VARCHAR(191) NOT NULL,
    `declarant` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notaFiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emission` TEXT NOT NULL,
    `series` VARCHAR(191) NOT NULL,
    `nfe` VARCHAR(191) NOT NULL,
    `clientSupplier` VARCHAR(191) NOT NULL,
    `issuer` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `situation` VARCHAR(191) NOT NULL,
    `dateTime` TEXT NULL,
    `paymentCondition` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `freteType` VARCHAR(191) NOT NULL,
    `vehiclePlates` VARCHAR(191) NOT NULL,
    `vehicleUf` VARCHAR(191) NOT NULL,
    `shippingCompany` VARCHAR(191) NOT NULL,
    `productQnty` VARCHAR(191) NOT NULL,
    `productType` VARCHAR(191) NOT NULL,
    `bruteWeightKg` VARCHAR(191) NOT NULL,
    `liquidWeightKg` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `natureId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `internal` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `accNumber` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_ProductToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductTonotaFiscal` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductTonotaFiscal_AB_unique`(`A`, `B`),
    INDEX `_ProductTonotaFiscal_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NaturezaToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NaturezaToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_NaturezaToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_certificateId_fkey` FOREIGN KEY (`certificateId`) REFERENCES `DigitalCertificate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_natureId_fkey` FOREIGN KEY (`natureId`) REFERENCES `Natureza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductTonotaFiscal` ADD CONSTRAINT `_ProductTonotaFiscal_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductTonotaFiscal` ADD CONSTRAINT `_ProductTonotaFiscal_B_fkey` FOREIGN KEY (`B`) REFERENCES `notaFiscal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Natureza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
