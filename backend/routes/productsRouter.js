const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const {isAuthenticated, authorizeRoles} = require('../Middlewares/auth');
const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/products/new').post(isAuthenticated,createProduct); 
router.route('/products/:id').put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct).get(getProductDetails);
module.exports = router;
