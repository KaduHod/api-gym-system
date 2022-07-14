/*
  Warnings:

  - You are about to drop the `_ExercicioToTreino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_B_fkey";

-- DropTable
DROP TABLE "_ExercicioToTreino";

-- CreateTable
CREATE TABLE "ExercicioDoTreino" (
    "id" SERIAL NOT NULL,
    "exercicioId" INTEGER NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "series" INTEGER,
    "repeticoes" INTEGER,
    "descricao" TEXT,
    "tipoRepeticoes" TEXT,
    "tipoSeries" TEXT,

    CONSTRAINT "ExercicioDoTreino_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExercicioDoTreino" ADD CONSTRAINT "ExercicioDoTreino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicioDoTreino" ADD CONSTRAINT "ExercicioDoTreino_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
