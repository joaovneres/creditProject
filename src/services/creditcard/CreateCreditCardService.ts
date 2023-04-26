import { assert, object, string, size, refine, Infer } from "superstruct";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

const CreditCard = object({
  nomeDono: size(string(), 4, 50),
  numeroCartao: size(string(), 16, 16),
  dataExp: size(string(), 7, 7),
  codSeguranca: size(string(), 3, 3),
});

interface CreditCardRequest {
  nomeDono: string;
  numeroCartao: string;
  dataExp: string;
  codSeguranca: string;
}

class CreateCreditCardService {
  async execute({
    nomeDono,
    numeroCartao,
    dataExp,
    codSeguranca,
  }: CreditCardRequest) {
    if (!CreditCard.is({ nomeDono, numeroCartao, dataExp, codSeguranca })) {
      throw new Error("Dados inválidos.");
    }
    if (!nomeDono) {
      throw new Error("Nome não enviado.");
    }
    if (!numeroCartao) {
      throw new Error("Número do cartão não enviado.");
    }
    if (!dataExp) {
      throw new Error("Data de expiração não enviada.");
    } else {
      const data = new Date();
      const ano = data.getFullYear();
      const mes = data.getMonth() + 1;
      const [mesReq, anoReq] = dataExp.split("/");
      if (ano > Number(anoReq)) {
        throw new Error("Ano de expiração menor que o atual.");
      } else {
        if (mes > Number(mesReq)) {
          throw new Error("Mês de expiração menor que o atual.");
        }
      }
    }
    if (!codSeguranca) {
      throw new Error("Código de segurança não enviado.");
    }

    const creditCardExists = await prismaClient.creditCard.findFirst({
      where: {
        numero_cartao: numeroCartao,
      },
    });

    if (creditCardExists) {
      throw new Error("Número de cartão já cadastrado!");
    }

    const codSegurancaHash = await hash(codSeguranca, 8);

    const creditCard = await prismaClient.creditCard.create({
      data: {
        nome_dono: nomeDono,
        numero_cartao: numeroCartao,
        data_exp: dataExp,
        cod_seguranca: codSegurancaHash,
      },
      select: {
        id: true,
        nome_dono: true,
        numero_cartao: true,
        data_exp: true,
      },
    });

    return creditCard;
  }
}

export { CreateCreditCardService };
