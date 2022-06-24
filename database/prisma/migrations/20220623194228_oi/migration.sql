-- DropForeignKey
ALTER TABLE "Periodizacao" DROP CONSTRAINT "Periodizacao_professorId_fkey";

-- AlterTable
ALTER TABLE "Periodizacao" ALTER COLUMN "professorId" DROP NOT NULL,
ALTER COLUMN "dias" DROP NOT NULL,
ALTER COLUMN "nome" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Periodizacao" ADD CONSTRAINT "Periodizacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
