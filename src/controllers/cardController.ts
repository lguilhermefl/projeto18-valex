import { Request, Response } from "express";
import { createCard } from "../services/createCard";

export async function createCardController(req: Request, res: Response) {
  const apiKey: any = req.headers["x-api-key"];
  const { employeeId, type } = req.body;

  await createCard(apiKey, employeeId, type);

  res.sendStatus(201);
}
