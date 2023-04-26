import { Request, response, Response } from "express";
import { CreateCreditCardService } from "../../services/creditcard/CreateCreditCardService";

class CreateCreditCardController {
  async handle(req: Request, res: Response) {
    const { nome_dono, numero_cartao, data_exp, cod_seguranca } = req.body;
    const createCreditCardService = new CreateCreditCardService();
    const creditCard = await createCreditCardService.execute({
      nome_dono,
      numero_cartao,
      data_exp,
      cod_seguranca,
    });

    return res.json(creditCard);
  }
}

export { CreateCreditCardController };
