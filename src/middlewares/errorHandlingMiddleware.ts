import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

export default function errorHandler(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.code === "Not Found") return res.status(404).send(error.message);
  if (error.code === "Conflict") return res.status(409).send(error.message);
  if (error.code === "Bad Request") return res.status(400).send(error.message);

  return res.sendStatus(500);
}
