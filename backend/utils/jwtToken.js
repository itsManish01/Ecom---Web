// create token and sedning token as a cookie


const sendToken = (user,stautsCode,res) => {
    const token = user.getJWTToken();

    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000,
        ),
        httpOnly : true
    }
    res.status(stautsCode).cookie('token',token,options).json( {
        sucess: true,
        token,
        user
    })
}

module.exports = sendToken;