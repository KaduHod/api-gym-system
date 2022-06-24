/*
  Warnings:

  - Added the required column `dias` to the `Periodizacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Periodizacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periodizacao" ADD COLUMN     "dias" INTEGER NOT NULL,
ADD COLUMN     "nome" VARCHAR(255) NOT NULL;
