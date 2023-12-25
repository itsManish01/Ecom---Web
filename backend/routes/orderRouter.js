const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../Middlewares/auth");
const  {
    createOrder
} = require("../controllers/orderController")

router.route('/order/new').post(isAuthenticated,createOrder);


module.exports = router;