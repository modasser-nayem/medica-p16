/*
  Warnings:

  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `entity` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentId` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `messageType` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `qualifications` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentId` on the `payments` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to drop the column `doctorId` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `schedules` table. All the data in the column will be lost.
  - The `gender` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_notification_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_calls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voice_calls` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[doctorId,startsAt]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId,doctorId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doctorId,dayOfWeek]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endsAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threadId` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "CallType" AS ENUM ('VOICE', 'VIDEO');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_patientId_fkey";

-- DropForeignKey
ALTER TABLE "user_notification_settings" DROP CONSTRAINT "user_notification_settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "video_calls" DROP CONSTRAINT "video_calls_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "video_calls" DROP CONSTRAINT "video_calls_callerId_fkey";

-- DropForeignKey
ALTER TABLE "video_calls" DROP CONSTRAINT "video_calls_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "voice_calls" DROP CONSTRAINT "voice_calls_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "voice_calls" DROP CONSTRAINT "voice_calls_callerId_fkey";

-- DropForeignKey
ALTER TABLE "voice_calls" DROP CONSTRAINT "voice_calls_receiverId_fkey";

-- DropIndex
DROP INDEX "appointments_paymentId_key";

-- DropIndex
DROP INDEX "doctors_licenseNumber_key";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date",
DROP COLUMN "isPaid",
DROP COLUMN "notes",
DROP COLUMN "paymentId",
DROP COLUMN "time",
DROP COLUMN "type",
ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "consultType" "ConsultationType" NOT NULL DEFAULT 'CHAT',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BDT',
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "entity",
DROP COLUMN "entityId";

-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "appointmentId",
DROP COLUMN "message",
DROP COLUMN "messageType",
DROP COLUMN "receiverId",
ADD COLUMN     "attachment" TEXT,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "threadId" TEXT NOT NULL,
ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "consultation_fees" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BDT',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "summary",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "roomId" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "isActive",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "isAvailable",
DROP COLUMN "licenseNumber",
DROP COLUMN "qualifications",
DROP COLUMN "specialization",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "specialties" TEXT,
ADD COLUMN     "timezone" TEXT,
ALTER COLUMN "departmentId" DROP NOT NULL,
ALTER COLUMN "experience" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "patientId",
DROP COLUMN "stripePaymentId",
ADD COLUMN     "appointmentId" TEXT NOT NULL,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "method" TEXT NOT NULL DEFAULT 'card',
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "currency" SET DEFAULT 'BDT';

-- AlterTable
ALTER TABLE "prescriptions" DROP COLUMN "doctorId",
DROP COLUMN "patientId",
ALTER COLUMN "medicines" DROP NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "isAvailable",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slotDurationMinutes" INTEGER NOT NULL DEFAULT 60,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "user_notification_settings";

-- DropTable
DROP TABLE "video_calls";

-- DropTable
DROP TABLE "voice_calls";

-- CreateTable
CREATE TABLE "schedule_exceptions" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TEXT,
    "endTime" TEXT,
    "blockedSlots" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_exceptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_threads" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calls" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "type" "CallType" NOT NULL,
    "status" "CallStatus" NOT NULL DEFAULT 'INITIATED',
    "roomId" TEXT,
    "recordingUrl" TEXT,
    "notes" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "schedule_exceptions_doctorId_date_idx" ON "schedule_exceptions"("doctorId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "chat_threads_appointmentId_key" ON "chat_threads"("appointmentId");

-- CreateIndex
CREATE INDEX "chat_threads_patientId_doctorId_idx" ON "chat_threads"("patientId", "doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "calls_appointmentId_key" ON "calls"("appointmentId");

-- CreateIndex
CREATE INDEX "appointments_patientId_startsAt_idx" ON "appointments"("patientId", "startsAt");

-- CreateIndex
CREATE INDEX "appointments_doctorId_startsAt_idx" ON "appointments"("doctorId", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_doctorId_startsAt_key" ON "appointments"("doctorId", "startsAt");

-- CreateIndex
CREATE INDEX "audit_logs_userId_createdAt_idx" ON "audit_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "chat_messages_threadId_createdAt_idx" ON "chat_messages"("threadId", "createdAt");

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_idx" ON "notifications"("userId", "isRead");

-- CreateIndex
CREATE UNIQUE INDEX "payments_appointmentId_key" ON "payments"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_patientId_doctorId_key" ON "reviews"("patientId", "doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_doctorId_dayOfWeek_key" ON "schedules"("doctorId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_exceptions" ADD CONSTRAINT "schedule_exceptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "chat_threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
