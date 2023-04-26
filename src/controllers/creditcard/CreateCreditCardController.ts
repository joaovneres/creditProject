import { Request, response, Response } from "express";
import { CreateCreditCardService } from "../../services/creditcard/CreateCreditCardService";

class CreateCreditCardController {
  async handle(req: Request, res: Response) {
    const { nomeDono, numeroCartao, dataExp, codSeguranca } = req.body;
    const createCreditCardService = new CreateCreditCardService();
    const creditCard = await createCreditCardService.execute({
      nomeDono,
      numeroCartao,
      dataExp,
      codSeguranca,
    });

    return res.json(creditCard);
  }
}

export { CreateCreditCardController };
