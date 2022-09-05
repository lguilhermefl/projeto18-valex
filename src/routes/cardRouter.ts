import { Router } from "express";
import * as cardController from "../controllers/cardController";
import validateBodySchema from "../middlewares/bodySchemaValidationMiddleware";
import validateApiKeySchema from "../middlewares/apiKeyValidationMiddleware";
import { cardTypeSchema } from "../schemas/createCardSchema";
import { activateCardSchema } from "../schemas/activateCardSchema";
import validateCardId from "../middlewares/cardIdValidationMiddleware";
import { cardIdAndPasswordSchema } from "../schemas/cardIdAndPasswordSchema";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateApiKeySchema,
  validateBodySchema(cardTypeSchema),
  cardController.createCardController
);
cardRouter.put(
  "/cards",
  validateBodySchema(activateCardSchema),
  cardController.activateCardController
);
cardRouter.get(
  "/cards/balance/:cardId",
  validateCardId,
  cardController.getCardBalanceAndTransactionsController
);
cardRouter.put(
  "/cards/block",
  validateBodySchema(cardIdAndPasswordSchema),
  cardController.blockCardController
);
cardRouter.put(
  "/cards/unblock",
  validateBodySchema(cardIdAndPasswordSchema),
  cardController.unblockCardController
);
cardRouter.post(
  "/cards/virtual",
  validateBodySchema(cardIdAndPasswordSchema),
  cardController.createVirtualCardController
);
cardRouter.delete(
  "/cards/virtual",
  validateBodySchema(cardIdAndPasswordSchema),
  cardController.deleteVirtualCardController
);

export default cardRouter;
