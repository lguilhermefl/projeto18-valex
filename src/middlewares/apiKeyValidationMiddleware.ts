import { Request, Response, NextFunction } from "express";
import { apiKeySchema } from "../schemas/createCardSchema";

export default function validateApiKeySchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = apiKeySchema.validate(req.headers["x-api-key"], {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(422)
      .send(error.details.map((detail: any) => detail.message));
  }

  return next();
}
