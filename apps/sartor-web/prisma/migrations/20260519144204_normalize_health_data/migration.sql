/*
  Warnings:

  - You are about to drop the column `calories` on the `HealthData` table. All the data in the column will be lost.
  - You are about to drop the column `heartRate` on the `HealthData` table. All the data in the column will be lost.
  - You are about to drop the column `sleepHours` on the `HealthData` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `HealthData` table. All the data in the column will be lost.
  - Added the required column `recordedAt` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `HealthData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthData" DROP COLUMN "calories",
DROP COLUMN "heartRate",
DROP COLUMN "sleepHours",
DROP COLUMN "steps",
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "recordedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
