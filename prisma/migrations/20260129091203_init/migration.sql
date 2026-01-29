/*
  Warnings:

  - The values [AUTH,PAYMENT,NOTIFICATION,ANALYTICS,OTHER] on the enum `Log_microservice` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Log` MODIFY `microservice` ENUM('USER', 'EFFECT', 'BATTLE', 'LOGGER', 'PLAYER', 'ENEMY', 'GAME', 'ITEM') NOT NULL;
