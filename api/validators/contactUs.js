const Joi = require('joi');


const createSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().trim().required(),
    message: Joi.string().required()
});


module.exports = {
    createSchema
}