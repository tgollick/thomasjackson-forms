-- CreateTable
CREATE TABLE "VerificationCodes" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '10 minutes',

    CONSTRAINT "VerificationCodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCodes_code_key" ON "VerificationCodes"("code");
