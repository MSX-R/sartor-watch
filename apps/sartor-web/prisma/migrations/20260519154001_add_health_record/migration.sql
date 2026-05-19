-- CreateTable
CREATE TABLE "HealthRecord" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "steps" INTEGER,
    "calories" INTEGER,
    "distance" DOUBLE PRECISION,
    "heartRate" INTEGER,
    "sleepDuration" INTEGER,
    "weight" DOUBLE PRECISION,
    "bodyFat" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthRecord_pkey" PRIMARY KEY ("id")
);
