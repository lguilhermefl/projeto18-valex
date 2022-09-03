import { Request, Response } from "express";
import rechargeCard from "../services/rechargeCard";

export async function rechargeCardController(req: Request, res: Response) {
  const apiKey: any = req.headers["x-api-key"];
  const { cardId, amount }: { cardId: number; amount: number } = req.body;

  await rechargeCard(apiKey, cardId, amount);

  res.sendStatus(200);
}
