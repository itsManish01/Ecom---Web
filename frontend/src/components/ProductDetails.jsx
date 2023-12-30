import React, { useEffect, useState } from "react";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { addToCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "./MetaData";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ProductDetails() {
  const { isAuth } = useSelector((store) => store.user);
  const { product, loading } = useSelector((store) => store.productDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cnt, setCnt] = useState(1);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [comment, setComment] = useState("");
  const [ratingSubmit, setRatingSubmit] = useState(0);
  useEffect(
    () => async () => {
      try {
        dispatch({
          type: PRODUCT_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message,
        });
        toast.error(error.response.data.message, {
          theme: "dark",
          position: "bottom-right",
        });
      }
    },
    [dispatch, id]
  );
  const addtocartHandler = () => {
    dispatch(addToCart(product, cnt));
    toast.success("Added to cart", { theme: "dark", position: "bottom-right" });
  };
  const submitReviewHandler = async() => {
    if (isAuth) {
      const newReview = {
        rating : ratingSubmit,
        productID : product._id,
        comment 
      } 
      try {
        await axios.put("/api/v1/review",newReview);
        toast.success("Review Added",{theme:"dark",position:"bottom-right"});
        dispatch({
          type: PRODUCT_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
        setModal(!modal);
      } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message,
        });
        toast.error(error.response.data.message, {
          theme: "dark",
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Login Please");
      navigate("/signin");
    }
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 25,
  };
  const copyToClipBoard = () => {
    let text = document.getElementById("productID").innerHTML;
    navigator.clipboard.writeText(`http://localhost:3000/products/${text}`);
    toast.success("Link coppied!", { theme: "dark", position: "bottom-right" });
  };
  const increase = () => {
    if (cnt < product.stock) {
      setCnt(cnt + 1);
    }
  };
  const decrease = () => {
    if (cnt > 1) {
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
                      <i className="fas fa-share"></i>
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
                      <h1>Quantity : </h1>
                      <div className="flex ml-6 items-center">
                        <button
                          onClick={decrease}
                          className="p-2 font-bold px-3 bg-gray-500 rounded-l-xl "
                        >
                          -
                        </button>
                        <p className="bg-white p-2 px-3 text-black">{cnt}</p>
                        <button
                          className="p-2 px-3 font-bold  bg-gray-500 rounded-r-xl"
                          onClick={increase}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-white">
                      Rs. {product.price}
                    </span>
                    <button
                      disabled={product.stock < 1 ? true : false}
                      onClick={addtocartHandler}
                      className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <button
                    onClick={toggleModal}
                    className="flex mt-5  text-white bg-pink-400 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                  >
                    Submit review
                  </button>
                  <Modal style={customStyles} isOpen={modal}>
                    <div className="bg-gray-900 p-6 flex gap-8 flex-col justify-center -m-5 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="block w-5 h-5 text-gray-500 "
                        viewBox="0 0 975.036 975.036"
                      >
                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                      </svg>
                      <ReactStars
                        count={5}
                        onChange={(newRating) => {
                          setRatingSubmit(newRating);
                        }}
                        size={30}
                        value={ratingSubmit}
                        color2={"#ffd700"}
                      ></ReactStars>
                      <textarea
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        value={comment}
                        rows="5"
                        className="p-4 bg-gray-700 text-white rounded-lg"
                        placeholder="Comment"
                      ></textarea>
                      <div className="flex flex-row justify-between">
                        <button
                          onClick={submitReviewHandler}
                          className="text-white px-2 bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                          Submit
                        </button>
                        <button
                          className="text-white px-2 bg-red-500 rounded-md hover:bg-red-600"
                          onClick={toggleModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>{" "}
          </>
        )}
      </section>
      {loading ? (
        <></>
      ) : (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-8 mx-auto">
            <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
              Reviews
            </h1>

            {product.reviews && product.reviews[0] ? (
              <>
                <div className="flex flex-wrap flex-row -m-4 overflow-x-auto">
                  {product.reviews &&
                    product.reviews.map((item) => {
                      return <ReviewCard review={item} />;
                    })}
                </div>
              </>
            ) : (
              <h1 className="text-xl font-medium title-font text-white mb-12 text-center">
                No Reviews Yet ..!!
              </h1>
            )}
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
}
