/*
  Warnings:

  - You are about to drop the column `birthCertificate` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `canSupplyBankStatements` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `drivingLicence` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `passportStatus` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `proofOfAddress` on the `RentalApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalApplication" DROP COLUMN "birthCertificate",
DROP COLUMN "canSupplyBankStatements",
DROP COLUMN "drivingLicence",
DROP COLUMN "passportStatus",
DROP COLUMN "proofOfAddress";

-- AlterTable
ALTER TABLE "VerificationCodes" ALTER COLUMN "expiry" SET DEFAULT now() + interval '10 minutes';
