const Joi = require('joi');


const createSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().trim().required().valid("rupee", "dollar")
});


module.exports = {
    createSchema
}