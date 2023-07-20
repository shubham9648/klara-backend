const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification


const {
    create,
    search
} = require('../controllers/order');

const  validate  = require("../../middleware/validator")
// const { notification } = require("../../constants/userRoles")
const {
    createOrderSchema
} = require("../validators/order");


router.route('/').post(verifyToken ,validate(createOrderSchema),  create);
router.route('/').get(verifyToken, search);


module.exports = router;