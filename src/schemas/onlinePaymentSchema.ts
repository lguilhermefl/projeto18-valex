import joi from "joi";

export const onlinePaymentSchema = joi.object({
  number: joi
    .string()
    .pattern(/^[0-9]{4}(?:-[0-9]{4}){3}$/, { name: "card number" })
    .length(19)
    .required(),
  cardholderName: joi.string().required(),
  expirationDate: joi
    .string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { name: "expiration code" })
    .length(5)
    .required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "security code" })
    .length(3)
    .required(),
  businessId: joi.number().greater(0).required(),
  amount: joi.number().greater(0).required(),
});
