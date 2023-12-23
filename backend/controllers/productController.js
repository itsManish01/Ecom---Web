const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
//create a new product
exports.createProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    sucess: true,
    product,
  });
});
//access all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const productCountPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productCountPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    sucess: true,
    products,
    productCount
  });
});

//update a product
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  // if(!product){
  //     return res.status(500).json({
  //         sucess : false,
  //         message : "product not found"
  //     })
  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    message: "Product Updated",
    product,
  });
});
//get a product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    sucess: true,
    product,
  });
});

//delete a product
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    sucess: true,
    message: "product Deleted",
  });
});
