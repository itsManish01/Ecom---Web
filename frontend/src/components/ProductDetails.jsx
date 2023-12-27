import React, { useEffect, useState } from "react";
import { clearErrors, getProductDetails } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "./MetaData";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cnt, setCnt] = useState(0);
  const { product, loading, error } = useSelector((store) => store.productDetails);
    useEffect(() => {
        dispatch(getProductDetails(id));
        if(error){
            toast.error(error, { theme: "dark" });
            dispatch(clearErrors());
        }
    }, [dispatch, id,error]);
    
    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      value: 5,
      isHalf: true,
      size: window.innerWidth < 600 ? 15 : 25,
    };
  const copyToClipBoard = () => {
    let text = document.getElementById("productID").innerHTML;
    navigator.clipboard.writeText(`http://localhost:3000/products/${text}`);
    toast.success("Link coppied!", { theme: "dark" });
  };
  const increase = () => {
    if (cnt < product.stock) {
      setCnt(cnt + 1);
    }
  };
  const decrease = () => {
    if (cnt > 0) {
      setCnt(cnt - 1);
    }
  };
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font flex justify-centeroverflow-hidden">
        {loading && !product ? (
          <Loading />
          ) : (
            <>
            <MetaData title={`Ecom - ${product.name}`} />
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Carousel to be added */}
              {product.images ? (
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={product.images[0].url}
                />
              ) : (
                <Loading />
              )}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.category}
                </h2>
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <p className="flex flex-row py-2 items-center">
                  Product ID # <p id="productID">{product._id}</p>
                  <button
                    title="share"
                    className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded-2xl"
                    onClick={copyToClipBoard}
                  >
                    <i className ="fas fa-share"></i>
                  </button>
                </p>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <span className="ml-3">
                      <ReactStars {...options} />{" "}
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                    {product.numOfReviews} Reviews
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                  <div className="flex">
                    <span className="mr-3">Stock :</span>
                    {product.stock ? (
                      <p className="text-green-600 font-semibold"> InStock</p>
                    ) : (
                      <p className="text-red-700 font-semibold">OutOfStock</p>
                      )}
                  </div>

                  <div className="flex ml-6 items-center">
                    <button
                      onClick={increase}
                      className="p-2 font-bold  bg-gray-500 rounded-l-xl "
                      >
                      +
                    </button>
                    <p className="bg-white p-2 px-3 text-black">{cnt}</p>
                    <button
                      onClick={decrease}
                      className="p-2 px-3 font-bold  bg-gray-500 rounded-r-xl"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-white">
                    Rs. {product.price}
                  </span>
                  <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                    Add to Cart
                  </button>
                </div>
                <button className="flex mt-5  text-white bg-pink-400 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Submit review
                </button>
              </div>
            </div>
          </div> </>
        )}
      </section>
    
    <section className ="text-gray-400 bg-gray-900 body-font">
        <div className ="container px-5 py-8 mx-auto">
          <h1 className ="text-3xl font-medium title-font text-white mb-12 text-center">
            Reviews
          </h1>

          {product.reviews && product.reviews[0] ? (
            <>
              <div className ="flex flex-wrap flex-row -m-4 overflow-x-auto">
                {product.reviews &&
                  product.reviews.map((item) => {
                    return <ReviewCard review={item} />;
                  })}
              </div>
            </>
          ) : (
            <h1 className ="text-xl font-medium title-font text-white mb-12 text-center">
              No Reviews Yet ..!!
            </h1>
          )}
        </div>
      </section>
      <ToastContainer />
    </>
    );
}
