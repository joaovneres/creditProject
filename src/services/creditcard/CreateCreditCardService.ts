import { assert, object, string, size, refine, Infer } from "superstruct";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

const CreditCard = object({
  nome_dono: size(string(), 4, 50),
  numero_cartao: size(string(), 16, 16),
  data_exp: size(string(), 7, 7),
  cod_seguranca: size(string(), 3, 3),
});

type CreditCardRequest = Infer<typeof CreditCard>;

class CreateCreditCardService {
  async execute({
    nome_dono,
    numero_cartao,
    data_exp,
    cod_seguranca,
  }: CreditCardRequest) {
    if (!nome_dono) {
      throw new Error("Nome não enviado.");
    }
    if (!numero_cartao) {
      throw new Error("Número do cartão não enviado.");
    }
    if (!data_exp) {
      throw new Error("Data de expiração não enviada.");
    } else {
      const data = new Date();
      const ano = data.getFullYear();
      const mes = data.getMonth() + 1;
      const [mesReq, anoReq] = data_exp.split("/");
      if (ano > Number(anoReq)) {
        throw new Error("Ano de expiração inválido.");
      } else {
        if (mes > Number(mesReq)) {
          throw new Error("Mês de expiração inválido.");
        }
      }
    }
    if (!cod_seguranca) {
      throw new Error("Código de segurança não enviado.");
    }

    const CreditCardExists = await prismaClient.creditCard.findFirst({
      where: {
        numero_cartao: numero_cartao,
      },
    });

    if (CreditCardExists) {
      throw new Error("Número de cartão já cadastrado!");
    }

    const codSegurancaHash = await hash(cod_seguranca, 8);

    const creditCard = await prismaClient.creditCard.create({
      data: {
        nome_dono: nome_dono,
        numero_cartao: numero_cartao,
        data_exp: data_exp,
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
