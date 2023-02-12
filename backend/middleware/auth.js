const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("\n"+token+"\n");

    if (!token) {
        return next(new ErrorHandler("Please loginto access this resource", 401));
    }

    const decodedData = jwt.verify(token, "secret");

    req.user = await User.findById(decodedData.id);

    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        //If not an admin
        if (!roles.includes(req.user.role)) {
           return  next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    }
}