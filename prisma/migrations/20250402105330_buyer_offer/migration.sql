-- AlterTable
ALTER TABLE "VerificationCodes" ALTER COLUMN "expiry" SET DEFAULT now() + interval '10 minutes';

-- CreateTable
CREATE TABLE "BuyerOffer" (
    "id" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "buyerNames" TEXT[],
    "currentAddress" TEXT NOT NULL,
    "identificationUploadKeys" TEXT[],
    "fundPurchase" TEXT NOT NULL,
    "fundProof" TEXT NOT NULL,
    "fundProofKey" TEXT NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "depositDetails" TEXT NOT NULL,
    "requireMortgage" BOOLEAN NOT NULL,
    "brokerContact" BOOLEAN NOT NULL,
    "politicallyExposed" BOOLEAN NOT NULL,
    "politicallyExposedDetails" TEXT,
    "declarationNames" TEXT[],
    "declarationSignature" TEXT[],
    "declarationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyerOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MortgageBroker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "buyerOfferId" TEXT NOT NULL,

    CONSTRAINT "MortgageBroker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "buyerOfferId" TEXT NOT NULL,

    CONSTRAINT "Solicitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MortgageBroker_buyerOfferId_key" ON "MortgageBroker"("buyerOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitor_buyerOfferId_key" ON "Solicitor"("buyerOfferId");

-- AddForeignKey
ALTER TABLE "MortgageBroker" ADD CONSTRAINT "MortgageBroker_buyerOfferId_fkey" FOREIGN KEY ("buyerOfferId") REFERENCES "BuyerOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitor" ADD CONSTRAINT "Solicitor_buyerOfferId_fkey" FOREIGN KEY ("buyerOfferId") REFERENCES "BuyerOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
