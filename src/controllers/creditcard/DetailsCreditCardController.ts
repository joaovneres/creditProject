import { Request, Response } from "express";
import { DetailsCreditCardService } from "../../services/creditcard/DetailsCreditCardService";

class DetailsCreditCardController {
  async handle(req: Request, res: Response) {
    const authToken = req.headers.authorization;
    const detailsCreditCardService = new DetailsCreditCardService();
    const detailsCreditCard = await detailsCreditCardService.execute(authToken);
    return res.json(detailsCreditCard);
  }
}

export { DetailsCreditCardController };
