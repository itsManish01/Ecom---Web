const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto')

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
        success: true,
        message : "logged Out"
    })

}

//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    // console.log(req.body);
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",401));
    }
    //get the token
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});
    
    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordURL} 
    \n\nIf you didn't requested this email, then please ignore it`;
    
    try {
        await sendEmail({
            email : user.email,
            subject : "Ecom Password change request",
            message 
        });
        res.status(200).json({
            success : true,
            message : `Email send to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave : false});

        return next(new ErrorHandler(error.message,500));
    }

});

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken ,
        resetPasswordExpire : {$gt : Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Invalid token or token is expired" ,400));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Passwords doesn't match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();


    sendToken(user,200,res);
})

//get user profile
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user  = await User.findById(req.user._id);
    res.status(200).json({
        success : true,
        user,
    })
})

//update password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user  = await User.findById(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Pasword does'nt match",400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
})
//update profile user
exports.updateProfile = catchAsyncErrors( async(req,res,next)=>{
    const newData = {
        email : req.body.email,
        name : req.body.name,
    }

    //img update to be added {cloudiary}

    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new : true,
        runValidators : true,
    })
    res.status(200).json({
        success : true,
        message : "Profile Updated"
    })
})