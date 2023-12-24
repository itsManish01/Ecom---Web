
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || "Internal Server error";

    // wrong mondogb ID error
    if(err.name==="CastError"){
        const message = `Resource Not Found, Invalid : ${err.path}`;
        err = new ErrorHandler(message , 400);
    }
    //duplicate key mongoose
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
        err = new ErrorHandler(message,400);
    }
    //wrong JWT token
    if(err.name==="JsonWebTokenError"){
        err = new ErrorHandler("Json web token is invalid, please try again",400);
    }
    //JWT token expire
    if(err.name==="TokenExpireError"){
        err = new ErrorHandler("Json web token expired!, please try again",400);
    }
    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}