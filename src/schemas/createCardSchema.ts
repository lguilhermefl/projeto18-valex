import joi from "joi";

export const apiKeySchema = joi.string().required().messages({
  "any.required": "Api key is required",
});

export const cardTypeSchema = joi.object({
  employeeId: joi.number().greater(0).required(),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});
