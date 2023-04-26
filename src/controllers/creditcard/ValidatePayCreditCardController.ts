import { Request, Response } from "express";

class ValidatePayCreditCardController {
  async handle(req: Request, res: Response) {
    return res.json({ status: "Compra autorizada" });
  }
}

export { ValidatePayCreditCardController };
