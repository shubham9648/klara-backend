const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator
const { masterService } = require("../../constants/userRoles")

const {
    create,
    search
} = require('../controllers/masterService');

const {
    createSchema
} = require("../validators/masterService");


router.route('/').post(validate(createSchema),verifyToken, allowEitherRole(masterService.handlers.create),  create);
router.route('/').get(verifyToken, search);


module.exports = router;