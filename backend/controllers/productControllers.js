const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//Creating a product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof (req.body.images) === "string") {   //If only one image then we just push it to array
        images.push(req.body.images);
    } else { //Else it itself the total array
        images = req.body.images;
    }

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
});

//Get all products 
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const product = await Product.find();

    res.status(200).json({
        success: true,
        product
    });
})

//Get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    // req.body.user = req.user.id;
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
    })
})