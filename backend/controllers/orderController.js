const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const Order = require("../models/orderModel");

//create a new order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt : Date.now(),
    user : req.user._id
  })

  res.status(200).json( {
    success : true,
    message : "Order Placed Successfully",
    order
  })
});


// get a single order
exports.getSingleOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user").populate("orderItems.product");
    if(!order){
        return next(new ErrorHandler(`Invalid Order ID : ${req.params.id}`,400));
    }
    res.status(200).json({
        success : true,
        order
    })
})

//get all orders of a user 
exports.myOrders = catchAsyncErrors( async(req,res,next) => {
    const orders = await Order.find({user : req.user._id}).populate("orderItems.product");
    
    res.status(200).json({
        success : true,
        orders,
    })
})

//get all orderd --ADMIN
exports.getAllOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

//update order status --ADMIN
exports.updateOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found",400));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Product already delivered",400));
    }

    //update the stock
    order.orderItems.forEach(async(item)=>{
        await updateStock(item.product , item.quantity);
    })

    order.orderStatus = req.body.status;
    if(req.body.status ==="Delivered"){
        order.delieveredAt = Date.now();
    }
    
    await order.save({
        validateBeforeSave :false
    });
    res.status(200).json({
        success: true,
        order,
    })
})

async function updateStock(productID,quantity){
    const product = await Product.findById(productID);
    product.stock -= quantity;
    await product.save();
}

//delete order -- ADMIN
exports.deleteOrder= catchAsyncErrors( async(req,res,next)=>{
    const order  = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Invalid Order id : ${req.params.id}`,400));
    } 
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success : true,
        message :"Order Deleted Successfully",
    })
})