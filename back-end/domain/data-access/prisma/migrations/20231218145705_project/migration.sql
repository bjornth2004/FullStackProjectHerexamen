/*
  Warnings:

  - A unique constraint covering the columns `[huurderId]` on the table `Kot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Kot" ADD COLUMN     "huurderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Kot_huurderId_key" ON "Kot"("huurderId");

-- AddForeignKey
ALTER TABLE "Kot" ADD CONSTRAINT "Kot_huurderId_fkey" FOREIGN KEY ("huurderId") REFERENCES "Huurder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
