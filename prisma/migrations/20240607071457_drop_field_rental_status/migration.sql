/*
  Warnings:

  - You are about to drop the column `status` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "status";

-- DropEnum
DROP TYPE "RentalStatus";
