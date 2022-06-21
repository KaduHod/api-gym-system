-- DropForeignKey
ALTER TABLE "Exercicio" DROP CONSTRAINT "Exercicio_professorId_fkey";

-- AlterTable
ALTER TABLE "Exercicio" ALTER COLUMN "professorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
