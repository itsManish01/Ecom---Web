const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Please give product name"]
        },
        description : {
            type :String,
            required : [true, "Please give product Description"]
        },
        price : {
            type : Number,
            required : [true, "Please give product price"],
            maxLength : [8,"Price can't exceed 8 chars" ],
        },
        rating : {
            type : Number,
            default :0
        },
        images :[ {
            public_id : {
                type : String ,
                required : true
            },
            url : {
                type : String ,
                required : true
            }
        }],
        category: {
            type : String,
            required : [true, "Please give product category"]
        },
        stock : {
            type : Number,
            required : [true,"Please give stock number"],
            maxLength : [4,"cannot exceed 4 digits"],
            default : 1
        },
        numOfReviews : {
            type : Number,
            default : 0,
        },
        reviews : [
            {   
                user : {
                    type : mongoose.Schema.ObjectId,
                    ref : "User",
                    required : true
                },
                name : {
                    type : String,
                    required : true,
                },
                rating : {
                    type : Number,
                    required : true,
                },
                comment :{
                    type : String,
                    required :true
                }
            }
        ],
        user : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            required : true
        }
        ,
        createdAt : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model("Product",productSchema);