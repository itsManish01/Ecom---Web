const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const {isAuthenticated, authorizeRoles} = require('../Middlewares/auth');
const router = express.Router();


router.route('/products').get(authorizeRoles("admin") ,getAllProducts);
router.route('/products/new').post(isAuthenticated,authorizeRoles("admin"),createProduct); 
router.route('/products/:id').put(isAuthenticated,authorizeRoles("admin"),updateProduct)
                             .delete(isAuthenticated,authorizeRoles("admin"),deleteProduct)
                             .get(getProductDetails);
module.exports = router;
