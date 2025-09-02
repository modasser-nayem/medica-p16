/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentId` on the `chat_threads` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientId,doctorId]` on the table `chat_threads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consultationId` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "chat_threads" DROP CONSTRAINT "chat_threads_appointmentId_fkey";

-- DropIndex
DROP INDEX "calls_appointmentId_key";

-- DropIndex
DROP INDEX "chat_threads_appointmentId_key";

-- AlterTable
ALTER TABLE "calls" DROP COLUMN "appointmentId",
ADD COLUMN     "consultationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "consultationId" TEXT;

-- AlterTable
ALTER TABLE "chat_threads" DROP COLUMN "appointmentId";

-- CreateIndex
CREATE INDEX "calls_consultationId_type_idx" ON "calls"("consultationId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "chat_threads_patientId_doctorId_key" ON "chat_threads"("patientId", "doctorId");

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
