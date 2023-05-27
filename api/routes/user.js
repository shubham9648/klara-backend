const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    createSuperAdmin,
    createAdmin
} = require('../controllers/user');

const {
    createSuperAdminSchema,
    createOrganisationAdminSchema
} = require("../validators/user");


router.route('/createSuperAdmin').post(validate(createSuperAdminSchema), verifyToken, handleRole, createSuperAdmin);
router.route('/createUser').post(validate(createOrganisationAdminSchema), verifyToken, handleRole, createAdmin)



module.exports = router;