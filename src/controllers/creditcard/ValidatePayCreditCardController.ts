import { Request, Response } from "express";
import { ValidatePayCreditCardService } from "../../services/creditcard/ValidatePayCreditCardService";

class ValidatePayCreditCardController {
  async handle(req: Request, res: Response) {
    const authToken = req.headers.authorization;
    const validatePayCreditCardService = new ValidatePayCreditCardService();
    const validatePay = await validatePayCreditCardService.execute(authToken);
    return res.json(validatePay);
  }
}

export { ValidatePayCreditCardController };
