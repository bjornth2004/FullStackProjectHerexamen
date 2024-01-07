/*
  Warnings:

  - You are about to drop the column `login` on the `Verhuurder` table. All the data in the column will be lost.
  - You are about to drop the column `pass` on the `Verhuurder` table. All the data in the column will be lost.
  - Added the required column `password` to the `Verhuurder` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tel` on the `Verhuurder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Verhuurder" DROP COLUMN "login",
DROP COLUMN "pass",
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "tel",
ADD COLUMN     "tel" INTEGER NOT NULL;
