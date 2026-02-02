const Joi = require("joi");

module.exports.counterSchema = Joi.object({
  startDate: Joi.date()
    .required()
    .messages({
      "date.base": "Start date must be a valid date",
      "any.required": "Start date is required"
    }),

  endDate: Joi.date()
    .required()
    .min(Joi.ref("startDate"))
    .messages({
      "date.base": "End date must be a valid date",
      "date.min": "End date must be after start date",
      "any.required": "End date is required"
    })
});
