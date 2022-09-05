import joi from "joi";

export const activateCardSchema = joi.object({
  id: joi.number().greater(0).required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "security code" })
    .length(3)
    .required(),
  password: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "password" })
    .length(4)
    .required(),
});
