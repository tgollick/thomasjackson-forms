/*
  Warnings:

  - You are about to drop the column `allowHomeInspection` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `bankStatementFileKey` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `canProvideDocuments` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `ccjDetails` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `currentLandlordDetails` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `currentLivingSituation` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `currentSalary` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `employerAddress` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `employmentDuration` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `hasBankruptcy` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `hasCCJ` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `isSmoker` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyDebtPayments` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `poaFileKey` on the `RentalApplication` table. All the data in the column will be lost.
  - Added the required column `allowInspection` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankStatementsFileKey` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankruptOrInsolvent` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthCertificate` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canSupplyBankStatements` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countyCourtJudgements` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentSituation` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drivingLicence` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evicted` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `householdDetails` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lateRentalPayments` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportStatus` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proofOfAddress` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proofOfAddressFileKey` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smoker` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephoneNumber` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workHours` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `employmentStatus` on the `RentalApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CurrentSituation" AS ENUM ('homeowner', 'rented', 'livingAtHomeOrWithFriends');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('single', 'marriedOrPartner');

-- CreateEnum
CREATE TYPE "PassportStatus" AS ENUM ('valid', 'expired', 'none');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('fullTime', 'partTime', 'seekingEmployment', 'unemployed', 'retired', 'selfEmployed');

-- AlterTable
ALTER TABLE "RentalApplication" DROP COLUMN "allowHomeInspection",
DROP COLUMN "bankStatementFileKey",
DROP COLUMN "canProvideDocuments",
DROP COLUMN "ccjDetails",
DROP COLUMN "companyName",
DROP COLUMN "currentLandlordDetails",
DROP COLUMN "currentLivingSituation",
DROP COLUMN "currentSalary",
DROP COLUMN "email",
DROP COLUMN "employerAddress",
DROP COLUMN "employmentDuration",
DROP COLUMN "hasBankruptcy",
DROP COLUMN "hasCCJ",
DROP COLUMN "isSmoker",
DROP COLUMN "jobTitle",
DROP COLUMN "monthlyDebtPayments",
DROP COLUMN "phoneNumber",
DROP COLUMN "poaFileKey",
ADD COLUMN     "allowInspection" BOOLEAN NOT NULL,
ADD COLUMN     "bankStatementsFileKey" TEXT NOT NULL,
ADD COLUMN     "bankruptOrInsolvent" BOOLEAN NOT NULL,
ADD COLUMN     "birthCertificate" BOOLEAN NOT NULL,
ADD COLUMN     "canSupplyBankStatements" BOOLEAN NOT NULL,
ADD COLUMN     "countyCourtDetails" TEXT,
ADD COLUMN     "countyCourtJudgements" BOOLEAN NOT NULL,
ADD COLUMN     "currentSituation" "CurrentSituation" NOT NULL,
ADD COLUMN     "debtsPayment" DOUBLE PRECISION,
ADD COLUMN     "drivingLicence" BOOLEAN NOT NULL,
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "evicted" BOOLEAN NOT NULL,
ADD COLUMN     "householdDetails" TEXT NOT NULL,
ADD COLUMN     "latePaymentDetails" TEXT,
ADD COLUMN     "lateRentalPayments" BOOLEAN NOT NULL,
ADD COLUMN     "maritalStatus" "MaritalStatus" NOT NULL,
ADD COLUMN     "passportStatus" "PassportStatus" NOT NULL,
ADD COLUMN     "proofOfAddress" BOOLEAN NOT NULL,
ADD COLUMN     "proofOfAddressFileKey" TEXT NOT NULL,
ADD COLUMN     "smoker" BOOLEAN NOT NULL,
ADD COLUMN     "telephoneNumber" TEXT NOT NULL,
ADD COLUMN     "workHours" INTEGER NOT NULL,
DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatus" "EmploymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "VerificationCodes" ALTER COLUMN "expiry" SET DEFAULT now() + interval '10 minutes';

-- CreateTable
CREATE TABLE "PreviousAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "timeAtAddress" TEXT NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "PreviousAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandlordDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "LandlordDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployedDetails" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "employerAddress" TEXT NOT NULL,
    "employerPostCode" TEXT NOT NULL,
    "employerTelephone" TEXT NOT NULL,
    "employerEmail" TEXT NOT NULL,
    "timeEmployed" TEXT NOT NULL,
    "currentSalary" DOUBLE PRECISION NOT NULL,
    "nationalInsuranceNumber" TEXT NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "EmployedDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousEmployer" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "employerAddress" TEXT NOT NULL,
    "employerPostCode" TEXT NOT NULL,
    "employerTelephone" TEXT NOT NULL,
    "employerEmail" TEXT NOT NULL,
    "timeEmployed" TEXT NOT NULL,
    "previousSalary" DOUBLE PRECISION NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "PreviousEmployer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfEmployedDetails" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "SelfEmployedDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountantDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "selfEmployedDetailsId" TEXT NOT NULL,

    CONSTRAINT "AccountantDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessReference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "selfEmployedDetailsId" TEXT NOT NULL,

    CONSTRAINT "BusinessReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantor" (
    "id" TEXT NOT NULL,
    "canProvide" BOOLEAN NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "postCode" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "timeAtAddress" TEXT,
    "newAddressDetails" JSONB,
    "signature" TEXT,
    "date" TIMESTAMP(3),
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "Guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilitiesArrears" (
    "id" TEXT NOT NULL,
    "councilTax" BOOLEAN NOT NULL,
    "electric" BOOLEAN NOT NULL,
    "water" BOOLEAN NOT NULL,
    "tvLicence" BOOLEAN NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "UtilitiesArrears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NextOfKin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "NextOfKin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Declaration" (
    "id" TEXT NOT NULL,
    "printedName" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rentalApplicationId" TEXT NOT NULL,

    CONSTRAINT "Declaration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandlordDetails_rentalApplicationId_key" ON "LandlordDetails"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployedDetails_rentalApplicationId_key" ON "EmployedDetails"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousEmployer_rentalApplicationId_key" ON "PreviousEmployer"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "SelfEmployedDetails_rentalApplicationId_key" ON "SelfEmployedDetails"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountantDetails_selfEmployedDetailsId_key" ON "AccountantDetails"("selfEmployedDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessReference_selfEmployedDetailsId_key" ON "BusinessReference"("selfEmployedDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Guarantor_rentalApplicationId_key" ON "Guarantor"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "UtilitiesArrears_rentalApplicationId_key" ON "UtilitiesArrears"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "NextOfKin_rentalApplicationId_key" ON "NextOfKin"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Declaration_rentalApplicationId_key" ON "Declaration"("rentalApplicationId");

-- AddForeignKey
ALTER TABLE "PreviousAddress" ADD CONSTRAINT "PreviousAddress_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandlordDetails" ADD CONSTRAINT "LandlordDetails_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployedDetails" ADD CONSTRAINT "EmployedDetails_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousEmployer" ADD CONSTRAINT "PreviousEmployer_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfEmployedDetails" ADD CONSTRAINT "SelfEmployedDetails_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountantDetails" ADD CONSTRAINT "AccountantDetails_selfEmployedDetailsId_fkey" FOREIGN KEY ("selfEmployedDetailsId") REFERENCES "SelfEmployedDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessReference" ADD CONSTRAINT "BusinessReference_selfEmployedDetailsId_fkey" FOREIGN KEY ("selfEmployedDetailsId") REFERENCES "SelfEmployedDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guarantor" ADD CONSTRAINT "Guarantor_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilitiesArrears" ADD CONSTRAINT "UtilitiesArrears_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextOfKin" ADD CONSTRAINT "NextOfKin_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Declaration" ADD CONSTRAINT "Declaration_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
