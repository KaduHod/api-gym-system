-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "professorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
