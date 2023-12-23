const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true,"Please enter your name"],
        maxLength : [30,"Cannt exceed 30 characters"],
        minLength : [5,"Cannt be less than 5 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true,
        validator : [validator.isEmail,"Please enter a valid email"],
    },
    password : {
        type : String,
        required : [true,"Please enter a password"],
        select : false,
        minLength : [8,"Password should be 8 characters long"]
    },
    avatar : {
        public_id : {
            type : String ,
            required : true
        },
        url : {
            type : String ,
            required : true
        }
    },
    role : {
        type: String,
        default : "user"
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,

    createdAt : {
        type : Date,
        default : Date.now,
    }
})
// bcrypt -> hashing the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})

//jwt token
userSchema.methods.getJWTToken =function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    });
}

//compare password
userSchema.methods.comparePassword= async function(enteredPassword){
    let res = await bcrypt.compare(enteredPassword,this.password);
    // console.log(res);
    return res; 
}


module.exports = mongoose.model("User", userSchema);