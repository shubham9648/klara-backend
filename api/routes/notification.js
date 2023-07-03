const express = require('express');
const router = express.Router();
const { verifyToken, allowEitherRole, handleRole } = require('../../middleware/auth'); // Auth Verification
const validate = require('../../middleware/validator'); // Validator


const {
    create,
    search
} = require('../controllers/notification');

// const {
//     createOrderSchema
// } = require("../validators/order");


router.route('/').post(verifyToken,  create);
router.route('/').get(verifyToken, search);
// router.route('/:id').put(verifyToken, upd)


module.exports = router;