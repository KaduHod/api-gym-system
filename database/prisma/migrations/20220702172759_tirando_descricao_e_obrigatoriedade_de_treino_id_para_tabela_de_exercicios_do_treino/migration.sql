/*
  Warnings:

  - You are about to drop the column `descricao` on the `ExercicioDoTreino` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExercicioDoTreino" DROP CONSTRAINT "ExercicioDoTreino_treinoId_fkey";

-- AlterTable
ALTER TABLE "ExercicioDoTreino" DROP COLUMN "descricao",
ALTER COLUMN "treinoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExercicioDoTreino" ADD CONSTRAINT "ExercicioDoTreino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE SET NULL ON UPDATE CASCADE;
