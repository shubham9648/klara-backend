const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    createSuperAdmin,
    createAdmin,
    logIn,
    createUser,
    search
} = require('../controllers/user');

const { userDetail } = require("../../constants/userRoles")
const {
    createSuperAdminSchema,
    createOrganisationAdminSchema,
    logInSchema,
    createUserSchema
} = require("../validators/user");


router.route('/createSuperAdmin').post(validate(createSuperAdminSchema), createSuperAdmin);
router.route('/createAdmin').post(validate(createOrganisationAdminSchema), verifyToken, handleRole, createAdmin)
router.route('/login').post(validate(logInSchema), logIn);
router.route('/createUser').post(validate(createUserSchema), createUser);
router.route('/').get(verifyToken, search);


module.exports = router;