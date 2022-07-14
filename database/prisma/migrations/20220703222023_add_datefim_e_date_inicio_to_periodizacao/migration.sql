/*
  Warnings:

  - You are about to drop the column `dias` on the `Periodizacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Periodizacao" DROP COLUMN "dias",
ADD COLUMN     "dataFim" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
