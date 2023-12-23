
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || "Internal Server error";

    // wrong mondogb ID error
    if(err.name==="CastError"){
        const message = `Resource Not Found, Invalid : ${err.path}`;
        err = new ErrorHandler(message , 400);
    }

    res.status(err.statusCode).json({
        sucess : false,
        message : err.message
    })
}