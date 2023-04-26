import { Request, Response } from "express";
import { AuthCreditCardService } from "../../services/creditcard/AuthCreditCardService";

class AuthCreditCardController {
  async handle(req: Request, res: Response) {
    const { numeroCartao, codSeguranca } = req.body;
    const authCreditCardService = new AuthCreditCardService();
    const auth = await authCreditCardService.execute({
      numeroCartao,
      codSeguranca,
    });
    return res.json(auth);
  }
}

export { AuthCreditCardController };
