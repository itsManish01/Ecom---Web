const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncError");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/ApiFeatures");
//create a new product
exports.createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  
  let imagesLink = [];
  for (let index = 0; index < req.body.images.length; index++) {
    const result = await cloudinary.v2.uploader.upload(req.body.images[index], {
      folder: "Ecom",
    });
    imagesLink.push({
      public_id : result.public_id,
      url : result.url
    })
  }

  
  
  req.body.images = imagesLink;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message : "Product Created Successfully!",
    product,
  });
});
//access all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const productCountPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productCountPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});

//admin all products
exports.getAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: "desc" });
  res.status(200).json({
    success: true,
    products,
  });
});

//update a product
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  
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
  //delete the uploaded images from cloudinary
  for(let i=0;i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product Deleted!",
  });
});

//create a review OR update
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productID } = req.body;
  // console.log(req.user);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productID);
  const isReviewd = product.reviews.find((item) => {
    return item.user.toString() === req.user._id.toString();
  });

  if (!isReviewd) {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  } else {
    product.reviews.forEach((item) => {
      if (item.user.toString() === req.user._id.toString()) {
        item.rating = rating;
        item.comment = comment;
      }
    });
  }

  //update the net rating
  let sum = 0;
  for (let i = 0; i < product.reviews.length; i++) {
    sum += product.reviews[i].rating;
  }
  product.rating = sum / product.numOfReviews;

  //save the product
  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    message: "review added",
  });
});

//get all reviews of a product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productID);
  if (!product) {
    return next(new ErrorHandler("Product not found"), 400);
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete a review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productID);
  if (!product) {
    return next(new ErrorHandler("Product not found"), 400);
  }
  const reviews = product.reviews.filter((item) => {
    return item.user.toString() !== req.user._id.toString();
  });
  //update the net rating
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }
  if (reviews.length === 0) {
    product.rating = 0;
  } else {
    product.rating = sum / reviews.length;
  }
  product.numOfReviews = reviews.length;
  product.reviews = reviews;

  await product.save();
  res.status(200).json({
    success: true,
    message: "Review deleted Successfully",
  });
});
