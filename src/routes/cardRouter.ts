import { Router } from "express";
import * as cardController from "../controllers/cardController";
import validateBodySchema from "../middlewares/bodySchemaValidationMiddleware";
import validateApiKeySchema from "../middlewares/apiKeyValidationMiddleware";
import { cardTypeSchema } from "../schemas/createCardSchema";
import { activateCardSchema } from "../schemas/activateCardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card",
  validateApiKeySchema,
  validateBodySchema(cardTypeSchema),
  cardController.createCardController
);
cardRouter.put(
  "/card",
  validateBodySchema(activateCardSchema),
  cardController.activateCardController
);

export default cardRouter;
