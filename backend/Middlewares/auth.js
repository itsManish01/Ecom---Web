const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.isAuthenticated = catchAsyncError(async(req,res,next) => {
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Please Login to access this page",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})
exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role ${req.body.role} is not allowed is access this resource`,403));
        }
        next();
    };
};