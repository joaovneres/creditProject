import { Router } from "express";
import { CreateCreditCardController } from "./controllers/creditcard/CreateCreditCardController";

const router = Router();

// ------- Rotas para CreditCard ------- //
router.post("/creditcard", new CreateCreditCardController().handle);

export { router };
