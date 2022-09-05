import joi from "joi";

export const posPaymentSchema = joi.object({
  cardId: joi.number().greater(0).required(),
  password: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "password" })
    .length(4)
    .required(),
  businessId: joi.number().greater(0).required(),
  amount: joi.number().greater(0).required(),
});
