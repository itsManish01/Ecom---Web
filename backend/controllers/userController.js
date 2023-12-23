const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");


//register a user
exports.registerUser =  catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create( {
        name, password,email,
        avatar :{
            public_id : "this is sample ID",
            url :"demoURL"
        }
    });

    sendToken(user,201,res);
    
})

//login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please enter your credentials" , 400));
    }
    
    const user = await User.findOne({email}).select('+password');
    
    if(!user){
        return next(new ErrorHandler("Invalid Email Or Password" , 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email Or Password" , 401));
    }
    
    sendToken(user,200,res);
})


//logout user
exports.logoutUser = async(req,res,next)=>{
    res.cookie('token',null, {
        httpOnly : true,
        expires : new Date(Date.now()),
    })

    res.status(200).json({
        sucess: true,
        message : "logged Out"
    })

}