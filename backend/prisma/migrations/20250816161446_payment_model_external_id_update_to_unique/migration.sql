/*
  Warnings:

  - You are about to drop the column `description` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `externalId` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "description",
ALTER COLUMN "externalId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_externalId_key" ON "payments"("externalId");
