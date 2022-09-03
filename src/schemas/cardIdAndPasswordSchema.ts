import joi from "joi";

export const cardIdAndPasswordSchema = joi.object({
  id: joi.number().greater(0).required(),
  password: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "password" })
    .length(4)
    .required(),
});
