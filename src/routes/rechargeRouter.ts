import { Router } from "express";
import * as rechargeController from "../controllers/rechargeController";
import validateBodySchema from "../middlewares/bodySchemaValidationMiddleware";
import validateApiKeySchema from "../middlewares/apiKeyValidationMiddleware";
import { rechargeCardSchema } from "../schemas/rechargeCardSchema";

const rechargeRouter = Router();

rechargeRouter.post(
  "/recharges",
  validateApiKeySchema,
  validateBodySchema(rechargeCardSchema),
  rechargeController.rechargeCardController
);

export default rechargeRouter;
