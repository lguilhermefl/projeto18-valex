import { Request, Response } from "express";
import createCard from "../services/createCard";
import activateCard from "../services/activateCard";
import getCardBalanceAndTransactions from "../services/getCardBalanceAndTransactions";
import { TransactionTypes } from "../repositories/cardRepository";

export async function createCardController(req: Request, res: Response) {
  const apiKey: any = req.headers["x-api-key"];
  const { employeeId, type }: { employeeId: number; type: TransactionTypes } =
    req.body;

  await createCard(apiKey, employeeId, type);

  res.sendStatus(201);
}

export async function activateCardController(req: Request, res: Response) {
  const {
    id,
    securityCode,
    password,
  }: { id: number; securityCode: string; password: string } = req.body;

  await activateCard(id, securityCode, password);

  res.sendStatus(200);
}

export async function getCardBalanceAndTransactionsController(
  req: Request,
  res: Response
) {
  const { cardId } = req.params;
  const balanceAndTransactions: any = await getCardBalanceAndTransactions(
    Number(cardId)
  );

  res.status(200).send(balanceAndTransactions);
}
