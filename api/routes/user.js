const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    createSuperAdmin,
    createAdmin,
    logIn
} = require('../controllers/user');

const {
    createSuperAdminSchema,
    createOrganisationAdminSchema,
    logInSchema
} = require("../validators/user");


router.route('/createSuperAdmin').post(validate(createSuperAdminSchema), createSuperAdmin);
router.route('/createUser').post(validate(createOrganisationAdminSchema), verifyToken, handleRole, createAdmin)
router.route('/login').post(validate(logInSchema), logIn);


module.exports = router;