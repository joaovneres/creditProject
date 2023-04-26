import { verify } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface PayLoad {
  sub: string;
}

class DetailsCreditCardService {
  async execute(authToken: string) {
    const [, token] = authToken.split(" ");
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    const creditCard = await prismaClient.creditCard.findFirst({
      where: {
        id: sub,
      },
      select: {
        id: true,
        nome_dono: true,
        numero_cartao: true,
        data_exp: true,
      },
    });

    if (!creditCard) {
      throw new Error("Cartão não encontrado");
    }

    return { creditCard };
  }
}

export { DetailsCreditCardService };
