import { Infer, object, size, string } from "superstruct";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const CreditCardAuthRequest = object({
  numero_cartao: size(string(), 16, 16),
  cod_seguranca: size(string(), 3, 3),
});

type AuthRequest = Infer<typeof CreditCardAuthRequest>;

class AuthCreditCardService {
  async execute({ numero_cartao, cod_seguranca }: AuthRequest) {
    const creditCard = await prismaClient.creditCard.findFirst({
      where: {
        numero_cartao: numero_cartao,
      },
    });

    if (!creditCard) {
      throw new Error("Cartão não cadastrado!");
    }

    const codSegurancaMatch = await compare(
      cod_seguranca,
      creditCard.cod_seguranca
    );

    if (!codSegurancaMatch) {
      throw new Error("Código de segurança incorreto.");
    }

    const token = sign(
      {
        nomeDono: creditCard.nome_dono,
        numeroCartao: creditCard.numero_cartao,
        dataExp: creditCard.data_exp,
      },
      process.env.JWT_SECRET,
      {
        subject: creditCard.id,
        expiresIn: "59s",
      }
    );
    return {
      id: creditCard.id,
      nomeDono: creditCard.nome_dono,
      numeroCartao: creditCard.numero_cartao,
      dataExp: creditCard.data_exp,
      token: token,
    };
  }
}

export { AuthCreditCardService };
