import { Router } from "express";
import { createCardController } from "../controllers/cardController";
import validateBodySchema from "../middlewares/bodySchemaValidationMiddleware";
import validateApiKeySchema from "../middlewares/apiKeyValidationMiddleware";
import { cardTypeSchema } from "../schemas/createCardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/create",
  validateApiKeySchema,
  validateBodySchema(cardTypeSchema),
  createCardController
);

export default cardRouter;
