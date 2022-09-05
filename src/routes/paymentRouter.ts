import { Router } from "express";
import * as paymentController from "../controllers/paymentController";
import validateBodySchema from "../middlewares/bodySchemaValidationMiddleware";
import { posPaymentSchema } from "../schemas/posPaymentSchema";
import { onlinePaymentSchema } from "../schemas/onlinePaymentSchema";

const paymentRouter = Router();

paymentRouter.post(
  "/payments/pos",
  validateBodySchema(posPaymentSchema),
  paymentController.cardPaymentController
);
paymentRouter.post(
  "/payments/online",
  validateBodySchema(onlinePaymentSchema),
  paymentController.cardPaymentController
);

export default paymentRouter;
