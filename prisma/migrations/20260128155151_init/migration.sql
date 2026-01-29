/*
  Warnings:

  - You are about to drop the column `microserviceId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the `Microservice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `microservice` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_microserviceId_fkey`;

-- DropIndex
DROP INDEX `Log_microserviceId_idx` ON `Log`;

-- AlterTable
ALTER TABLE `Log` DROP COLUMN `microserviceId`,
    ADD COLUMN `microservice` ENUM('AUTH', 'PAYMENT', 'NOTIFICATION', 'ANALYTICS', 'OTHER') NOT NULL;

-- DropTable
DROP TABLE `Microservice`;
