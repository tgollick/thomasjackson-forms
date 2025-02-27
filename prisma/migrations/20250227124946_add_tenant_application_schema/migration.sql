-- AlterTable
ALTER TABLE "VerificationCodes" ALTER COLUMN "expiry" SET DEFAULT now() + interval '10 minutes';

-- CreateTable
CREATE TABLE "RentalApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "rentalAmount" DOUBLE PRECISION NOT NULL,
    "moveInDate" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "timeAtAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "currentLivingSituation" TEXT NOT NULL,
    "currentLandlordDetails" TEXT,
    "employmentStatus" TEXT NOT NULL,
    "jobTitle" TEXT,
    "companyName" TEXT,
    "employerAddress" TEXT,
    "employmentDuration" TEXT,
    "currentSalary" DOUBLE PRECISION,
    "hasCCJ" BOOLEAN NOT NULL,
    "ccjDetails" TEXT,
    "hasBankruptcy" BOOLEAN NOT NULL,
    "bankruptcyDate" TIMESTAMP(3),
    "monthlyDebtPayments" DOUBLE PRECISION,
    "pets" TEXT,
    "isSmoker" BOOLEAN NOT NULL,
    "allowHomeInspection" BOOLEAN NOT NULL,
    "reasonForMoving" TEXT NOT NULL,
    "canProvideDocuments" BOOLEAN NOT NULL,
    "idFileKey" TEXT NOT NULL,
    "poaFileKey" TEXT NOT NULL,
    "bankStatementFileKey" TEXT NOT NULL,

    CONSTRAINT "RentalApplication_pkey" PRIMARY KEY ("id")
);
