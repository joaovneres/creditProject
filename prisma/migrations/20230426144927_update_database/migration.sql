/*
  Warnings:

  - You are about to drop the `CreditCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CreditCard";

-- CreateTable
CREATE TABLE "creditcard" (
    "id" TEXT NOT NULL,
    "nome_dono" VARCHAR(50) NOT NULL,
    "numero_cartao" VARCHAR(16) NOT NULL,
    "data_exp" VARCHAR(7) NOT NULL,
    "cod_seguranca" VARCHAR(3) NOT NULL,
    "cadastrado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creditcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creditcard_numero_cartao_key" ON "creditcard"("numero_cartao");
