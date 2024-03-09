const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../Middlewares/auth");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getStats,
} = require("../controllers/orderController");
const { checkout, paymentVerification } = require("../controllers/paymentController");

router.route("/order/new").post(isAuthenticated, createOrder);
router.route("/order/details/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);
router
.route("/admin/orders/stats").get(isAuthenticated,authorizeRoles("admin"),getStats);
router
  .route("/checkout").post(checkout);
router
  .route("/paymentverification").post(paymentVerification);
module.exports = router;  
