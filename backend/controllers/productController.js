const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
//create a new product
exports.createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//access all products
exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {
  const productCountPerPage = 6;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productCountPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productsCount
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
    success: true,
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
    success: true,
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
    success: true,
    message: "product Deleted",
  });
});


//create a review OR update
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productID} = req.body;
  // console.log(req.user);
  const review = {
      user : req.user._id,
      name : req.user.name,
      rating : Number(rating),
      comment,
  }
  const product = await Product.findById(productID);
  const isReviewd = product.reviews.find(
      (item) => {
          return item.user.toString()===req.user._id.toString();
      }
  )

  if(!isReviewd){
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
  }else{
      product.reviews.forEach((item)=>{
          if(item.user.toString()===req.user._id.toString()){
              item.rating = rating;
              item.comment = comment
          }
      })
  }
  
  //update the net rating
  let sum= 0;
  for(let i =0;i<product.reviews.length ;i++){
      sum += product.reviews[i].rating;
  }
  product.rating = sum/(product.numOfReviews);

  //save the product
  await product.save({
    validateBeforeSave : false 
  });

  res.status(200).json({
      success : true,
      message : "review added"
  })
})

//get all reviews of a product
exports.getAllReviews = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.productID);
  if(!product){
    return next(new ErrorHandler("Product not found"),400);
  }
  res.status(200).json({
    success : true,
    reviews : product.reviews,
  })
})

//delete a review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.productID);
  if(!product){
    return next(new ErrorHandler("Product not found"),400);
  }
  const reviews = product.reviews.filter( (item)=>{
    return item.user.toString() !== req.user._id.toString();
  })
  //update the net rating
  let sum= 0;
  for(let i =0;i<reviews.length ;i++){
    sum += reviews[i].rating;
  }
  if(reviews.length===0){
    product.rating = 0;
  }else{
    product.rating = sum/(reviews.length);
  }
  product.numOfReviews = reviews.length;
  product.reviews = reviews;

  await product.save();
  res.status(200).json({
    success : true,
    message : "Review deleted Successfully"
  })


})