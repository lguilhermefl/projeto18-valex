import { Request, Response } from "express";
import payment from "../services/payment";

export async function cardPaymentController(req: Request, res: Response) {
  const paymentInfo = req.body;

  await payment(paymentInfo);

  res.sendStatus(200);
}
