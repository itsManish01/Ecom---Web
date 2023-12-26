import React, { useEffect } from "react";
import homePng from "./images/home.png";
import ProductCard from "./ProductCard.jsx";
import { HashLink } from "react-router-hash-link";
import MetaData from "./MetaData.js";
import { getProduct, clearErrors } from "../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { loading,error, products } = useSelector((store) => store.products);
  useEffect(() => {
    dispatch(getProduct());
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearErrors());
    }
  }, [dispatch,error]);

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
                Ecom <i class="fa-solid fa-truck-fast"></i>{" "}
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
                      return <ProductCard product={item} />;
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
