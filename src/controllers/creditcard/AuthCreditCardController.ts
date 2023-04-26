import { Request, Response } from "express";
import { AuthCreditCardService } from "../../services/creditcard/AuthCreditCardService";

class AuthCreditCardController {
  async handle(req: Request, res: Response) {
    const { numero_cartao, cod_seguranca } = req.body;
    const authCreditCardService = new AuthCreditCardService();
    const auth = await authCreditCardService.execute({
      numero_cartao,
      cod_seguranca,
    });
    return res.json(auth);
  }
}

export { AuthCreditCardController };
