import { verify } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface PayLoad {
  sub: string;
}

class ValidatePayCreditCardService {
  async execute(authToken: string) {
    const [, token] = authToken.split(" ");
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    const creditCard = await prismaClient.creditCard.findFirst({
      where: {
        id: sub,
      },
    });

    if (!creditCard) {
      throw new Error("Cartão não encontrado.");
    }

    return { status: "Compra autorizada" };
  }
}

export { ValidatePayCreditCardService };
