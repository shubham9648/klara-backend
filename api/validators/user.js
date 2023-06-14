const Joi = require('joi');
const { user } = require("../../constants/userRoles");




const createSuperAdminSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    devKey: Joi.string().trim().required().valid('DORA@KLARA')
});

const createOrganisationAdminSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    phone: Joi.object({
        work: Joi.string().trim().required(),
        mobile: Joi.string().trim().required()
    }).required(),
    password: Joi.string().trim().required(),
    profile: Joi.object({
        username: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        dob: Joi.date().required(),
        employeeId: Joi.string(),
    }).required(),
    address: Joi.object({
        country: Joi.string(),
        city: Joi.string().trim(),
        state: Joi.string().trim().required(),
        pincode: Joi.string().trim().required()
    }),
    roles: Joi.array().items(Joi.string().valid(...Object.values(user.roles)).required()).required(),
    gstNo: Joi.string().trim(),
    employmentStatus: Joi.string().trim().valid("employed", "unemployed")
});

const createUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    phone: Joi.object({
        work: Joi.string().trim().required(),
        mobile: Joi.string().trim().required()
    }).required(),
    password: Joi.string().trim().required(),
    profile: Joi.object({
        username: Joi.string().trim().required(),
        fullName: Joi.string().trim().required(),
        dob: Joi.date().required(),
    }).required(),
    address: Joi.object({
        country: Joi.string(),
        city: Joi.string().trim(),
        state: Joi.string().trim().required(),
        pincode: Joi.string().trim().required()
    }),
    isNewsLetter: Joi.boolean().required(),
    isAggrement: Joi.boolean().required(),
    isInformation: Joi.boolean().required(),
})

const logInSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required()
});

module.exports = {
    createSuperAdminSchema,
    createOrganisationAdminSchema,
    logInSchema,
    createUserSchema
}