const Joi = require('joi');



const createOrderSchema = Joi.object({
    userId: Joi.string().trim().required(),
    date: Joi.date().required(),
    service: Joi.array().items(Joi.string().trim().required()),
    houseArea: Joi.number().required(),
    havePet: Joi.boolean().required(),
    petName: Joi.array().items(Joi.string().trim()),
    donateToEmployee: Joi.boolean(),
    donatedAmount: Joi.number(),
    address: Joi.string().trim(),
    notes: Joi.string().trim()
});

const updateOrderSchema = Joi.object({
    userId: Joi.string().trim(),
    date: Joi.date().required(),
    service: Joi.array().items(Joi.string().trim()),
    houseArea: Joi.number(),
    havePet: Joi.boolean(),
    petName: Joi.array().items(Joi.string().trim()),
    donateToEmployee: Joi.boolean(),
    donatedAmount: Joi.number(),
    address: Joi.string().trim(),
    notes: Joi.string().trim(),
    employeeId: Joi.string().trim().required()
});

module.exports = {
    createOrderSchema,
    updateOrderSchema,
};