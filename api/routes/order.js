const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    create,
    search
} = require('../controllers/order');

const {
    createOrderSchema
} = require("../validators/order");

const { order } = require("../../constants/userRoles")


router.route('/').post(validate(createOrderSchema), verifyToken, allowEitherRole(order),  create);
router.route('/').get(verifyToken, search);
// router.route('/:id').put(verifyToken, upd)


module.exports = router;