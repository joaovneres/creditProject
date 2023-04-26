-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "nome_dono" VARCHAR(50) NOT NULL,
    "numero_cartao" VARCHAR(16) NOT NULL,
    "data_exp" VARCHAR(7) NOT NULL,
    "cod_seguranca" VARCHAR(3) NOT NULL,
    "cadastrado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_numero_cartao_key" ON "CreditCard"("numero_cartao");
