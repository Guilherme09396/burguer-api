const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    value_unit: Joi.number().required(),
    category_id: Joi.number().required()
})

module.exports = productSchema;