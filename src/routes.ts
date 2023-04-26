import { Router } from "express";
import { CreateCreditCardController } from "./controllers/creditcard/CreateCreditCardController";
import { AuthCreditCardController } from "./controllers/creditcard/AuthCreditCardController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailsCreditCardController } from "./controllers/creditcard/DetailsCreditCardController";

const router = Router();

// ------- Rotas para CreditCard ------- //
router.post("/creditcard", new CreateCreditCardController().handle);
router.post("/login", new AuthCreditCardController().handle);
router.get(
  "/cardinfo",
  isAuthenticated,
  new DetailsCreditCardController().handle
);

export { router };
