import { Request, Response, NextFunction } from "express";
import { cardIdSchema } from "../schemas/cardIdSchema";

export default function validateCardId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = cardIdSchema.validate(req.params.cardId, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(422)
      .send(error.details.map((detail: any) => detail.message));
  }

  return next();
}
