import React, { useEffect } from "react";
import homePng from "./images/home.png";
import ProductCard from "./ProductCard.jsx";
import { HashLink } from "react-router-hash-link";
import MetaData from "./MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading.jsx";
import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((store) => store.products);
  useEffect(
    () => async () => {
      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST,
        });
        let url = '/api/v1/products';
        const { data } = await axios.get(url);
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.message,
        });
        toast.error(error.response.data.message, {theme:"dark",position:"bottom-right"})
      }
    },
    [
      dispatch,
    ]
  );
  return (
    <>
      <MetaData title={"Ecom - Home"} />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-20  md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={homePng}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Welcome to
              <span className="text-yellow-500">
                {" "}
                Ecom <i className ="fa-solid fa-truck-fast"></i>{" "}
              </span>
            </h1>
            <p className="mb-8 leading-relaxed text-lg">
              "Empower Your Style, Elevate Your Experience: Shop Smart, Shop
              with
              <span className="text-yellow-500"> Ecom</span> !"
            </p>
            <div className="flex justify-center">
              <HashLink to="#section" smooth>
                <button className="inline-flex font-semibold text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                  Featured Products
                </button>
              </HashLink>
            </div>
          </div>
        </div>
        <section className="text-gray-400 bg-gray-900 body-font" id="section">
          <div className="container px-5 py-16 mx-auto">
            <div className="flex flex-wrap -m-4">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {products &&
                    products.map((item) => {
                      return <ProductCard key={item._id} product={item} />;
                    })}
                </>
              )}
            </div>
          </div>
        </section>
      </section>
      <ToastContainer />
    </>
  );
}
