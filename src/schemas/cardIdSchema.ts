import joi from "joi";

export const cardIdSchema = joi
  .string()
  .pattern(/^[1-9][0-9]*$/, { name: "id" })
  .required()
  .messages({
    "any.required": "Card id is required",
    "string.pattern.name": "Card id is not valid",
  });
