const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        itemsPrice,
        taxPrice,
        totalPrice,
        coupon,
        discountedPrice,
    } = req.body;

    const order = await Order.create({
        discountedPrice,
        orderItems,
        itemsPrice,
        taxPrice,
        coupon,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    })
});

//Get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(     //Here it gets the user ID from the product, then by that id
        "user",                                                     //it goes to 'users' model and get "name" & "email"
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    })
});

//Get logged in user's orders
exports.myOrders = catchAsyncError(async (req, res, next) => {  
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

//Get all orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {  
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});
