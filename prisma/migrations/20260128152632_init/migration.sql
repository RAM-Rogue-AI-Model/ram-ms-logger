-- CreateTable
CREATE TABLE `Microservice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Microservice_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `microserviceId` INTEGER NOT NULL,
    `action` ENUM('INSERT', 'REMOVE', 'UPDATE', 'OTHER') NOT NULL,
    `level` ENUM('DEBUG', 'INFO', 'WARN', 'ERROR') NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` VARCHAR(191) NOT NULL,

    INDEX `Log_microserviceId_idx`(`microserviceId`),
    INDEX `Log_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_microserviceId_fkey` FOREIGN KEY (`microserviceId`) REFERENCES `Microservice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
