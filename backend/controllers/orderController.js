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

