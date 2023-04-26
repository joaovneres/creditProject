import { Infer, object, size, string } from "superstruct";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const CreditCardAuthRequest = object({
  numeroCartao: size(string(), 16, 16),
  codSeguranca: size(string(), 3, 3),
});

type AuthRequest = Infer<typeof CreditCardAuthRequest>;

class AuthCreditCardService {
  async execute({ numeroCartao, codSeguranca }: AuthRequest) {
    const creditCard = await prismaClient.creditCard.findFirst({
      where: {
        numero_cartao: numeroCartao,
      },
    });

    if (!creditCard) {
      throw new Error("Cartão não cadastrado!");
    }

    const codSegurancaMatch = await compare(
      codSeguranca,
      creditCard.cod_seguranca
    );

    if (!codSegurancaMatch) {
      throw new Error("Código de segurança incorreto.");
    }

    const token = sign(
      {
        nomeDono: creditCard.nome_dono,
        numeroCartao: creditCard.numero_cartao,
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
      token: token,
    };
  }
}

export { AuthCreditCardService };
