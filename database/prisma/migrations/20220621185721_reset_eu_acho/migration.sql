-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER,
    "professorId" INTEGER,
    "type" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "cpf" TEXT,
    "nome" TEXT,
    "telefone" TEXT,
    "image" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creef" TEXT,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periodizacao" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alunoId" INTEGER,
    "professorId" INTEGER NOT NULL,

    CONSTRAINT "Periodizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treino" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "aquecimento" TEXT,
    "periodizacaoId" INTEGER,
    "exerciciosId" INTEGER,

    CONSTRAINT "Treino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "video" VARCHAR(255),
    "tipoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagem" TEXT,
    "professorId" INTEGER NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoExercicio" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "nome" CHAR(11) NOT NULL,

    CONSTRAINT "TipoExercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Execucao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Execucao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlunoToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExercicioToTreino" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_alunoId_key" ON "Profile"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_professorId_key" ON "Profile"("professorId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AlunoToProfessor_AB_unique" ON "_AlunoToProfessor"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunoToProfessor_B_index" ON "_AlunoToProfessor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExercicioToTreino_AB_unique" ON "_ExercicioToTreino"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercicioToTreino_B_index" ON "_ExercicioToTreino"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periodizacao" ADD CONSTRAINT "Periodizacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periodizacao" ADD CONSTRAINT "Periodizacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_periodizacaoId_fkey" FOREIGN KEY ("periodizacaoId") REFERENCES "Periodizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoExercicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercicioToTreino" ADD CONSTRAINT "_ExercicioToTreino_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercicioToTreino" ADD CONSTRAINT "_ExercicioToTreino_B_fkey" FOREIGN KEY ("B") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;
