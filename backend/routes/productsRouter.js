const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getAllProductsAdmin,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
  getReview
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../Middlewares/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticated, authorizeRoles("admin"), getAllProductsAdmin);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router.route("/admin/reviews/:id").get(isAuthenticated, authorizeRoles("admin"), getReview);

router.route("/product/:id").get(getProductDetails);
router
  .route("/review")
  .put(isAuthenticated, createProductReview)
  .delete(isAuthenticated, deleteReview);
router.route("/reviews").get(getAllReviews);
module.exports = router;
