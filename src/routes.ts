import { Router } from "express";
import { CreateCreditCardController } from "./controllers/creditcard/CreateCreditCardController";
import { AuthCreditCardController } from "./controllers/creditcard/AuthCreditCardController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ValidatePayCreditCardController } from "./controllers/creditcard/ValidatePayCreditCardController";

const router = Router();

// ------- Rotas para CreditCard ------- //
router.post("/creditcard", new CreateCreditCardController().handle);
router.post("/session", new AuthCreditCardController().handle);
router.get(
  "/pay",
  isAuthenticated,
  new ValidatePayCreditCardController().handle
);

export { router };
