const Joi = require('joi');
const { user } = require("../../constants/userRoles");




const createSuperAdminSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    devKey: Joi.string().trim().required().valid('DEVKEY@1947')
});

const createOrganisationAdminSchema = Joi.object({
    email: Joi.string().trim().required(),
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



module.exports = {
    createSuperAdminSchema,
    createOrganisationAdminSchema
    // createUserSchema
}