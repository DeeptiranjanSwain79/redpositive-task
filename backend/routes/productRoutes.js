const express = require('express');
const { getAllProducts, createProduct, getProductDetails } = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

//Creating a new producet -- Admin 
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//To get all products 
router.route('/product').get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

module.exports = router;