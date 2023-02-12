const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    const user = await User.create({
        name, email, password, role
    });

    const token = user.getJWTToken();

    sendToken(user, 201, res);          //201 => Created
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {

    //Taking email and password from the body
    const { email, password } = req.body;

    //Checking whether the user has given E-mail and password both or not
    if (!email || !password) {
        return next(new ErrorHandler("Please enter E-mail & Password", 400));
    }

    // If both E-mail and password received then find the user in the database
    const user = await User.findOne({ email }).select("+password"); 
    
    //If no user found
    if (!user) {
        new next(new ErrorHandler("Invalid Email or password", 401)); //401=> Unauthorised user
    }

    const isPasswordMatched = user.comparePassword(password);

    //If user found but password not matched
    if (!isPasswordMatched) {
        new next(new ErrorHandler("Invalid Email or password", 401));
    }

    //If password matched
    const token = user.getJWTToken();

    sendToken(user, 200, res);          //200=> OK
});

//Logout user
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
});

//Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});

//Get all users (admin access only)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});

//Get single users (admin access only)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with ID ${req.body.params}`));
    }

    res.status(200).json({
        success: true,
        user
    });
});
