const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    create,
    search,
    updateOne
} = require('../controllers/notification');

const { notification } = require("../../constants/userRoles")
// const {
//     createOrderSchema
// } = require("../validators/order");


router.route('/').post(verifyToken,  create);
router.route('/').get(verifyToken, search);
router.route('/:id').put(verifyToken, updateOne);


module.exports = router;