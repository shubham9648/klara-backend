const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    create,
    search
} = require('../controllers/contactUs');

const {
    createSchema
} = require("../validators/contactUs");


router.route('/').post(validate(createSchema),verifyToken,  create);
router.route('/').get(verifyToken, search);


module.exports = router;