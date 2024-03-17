const Joi = require("joi");

const restaurantSchema = Joi.object({
    name: Joi.string().required(),
    cnpj: Joi.string().min(14).max(14).required(),
    email: Joi.string().email().required()
})

module.exports = restaurantSchema;