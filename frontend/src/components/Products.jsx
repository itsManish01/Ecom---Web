import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import MetaData from "./MetaData";
import { getProduct } from "../actions/productActions";
import { categories } from "../constants/categories";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
  const { loading, products, productsCount } = useSelector(
    (store) => store.products
  );
  const [productsList, setProductsList] = useState(products.slice(0,8));
  const [hasMore , setHasMore] = useState(true);
  const [ratingAbove, setRatingAbove] = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [priceR, setPriceR] = useState(500000);
  const [category, setCategory] = useState("All");
  const moreProductsHandler = ()=>{
    const curr_len = productsList.length;
    if(curr_len < productsCount){
      setProductsList(products.slice(0,curr_len+8));
    }else{
      setHasMore(false);
    }
  }
  var { keyword } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(keyword, [priceL, priceR], category, ratingAbove));
  }, [dispatch, keyword, priceL, priceR, category, ratingAbove]);
  return (
    <>
      <MetaData title={"Ecom - Products"} />
      <div className="container px-5 py-4 mx-auto">
        <h1 className="text-3xl font-medium title-font text-white  text-center">
          Products
        </h1>
      </div>
      <section className="text-gray-400 bg-gray-900 body-font  mb-4 ">
        <div className="bg-gray-800 bg-opacity-50  py-2 px-8 flex flex-col items-center w-full ">
          <h2 className="text-white text-lg font-medium title-font  ">
            Filter
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-evenly ">
            <div className="relative mb-8">
              <p className="leading-7 text-sm text-gray-400">Price Range</p>
              <input
                type="text"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setPriceL(0);
                  } else {
                    setPriceL(e.target.value);
                  }
                }}
                placeholder="From"
                className="w-2/5 mx-1 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              to
              <input
                type="text"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setPriceR(500000);
                  } else {
                    setPriceR(e.target.value);
                  }
                }}
                placeholder="Upto"
                className="w-2/5 mx-1 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-8">
              <label for="email" className="leading-7 text-sm text-gray-400">
                Category
              </label>

              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-2 px-2 leading-8 transition-colors duration-200 ease-in-out"
                name="category"
              >
                {categories.map((item) => {
                  return (
                    <option className="bg-gray-700 my-2" value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative mb-8">
              <label
                for="steps-range"
                className="leading-7 text-sm text-gray-400"
              >
                Rating Above : {ratingAbove}
              </label>
              <input
                id="labels-range-input"
                type="range"
                min="0"
                max="5"
                onChange={(e) => {
                  setRatingAbove(e.target.value);
                }}
                step="0.5"
                className=" w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5  mx-auto">
          {loading ? (<Loading/>):
          (

            <InfiniteScroll 
            dataLength={productsList.length}
            loader = {<Loading/>}
            next = {moreProductsHandler}
            hasMore={hasMore}
            className="flex flex-wrap -m-4">
                {products &&
                  productsList.map((item) => {
                    return <ProductCard product={item} />;
                  })}
          </InfiniteScroll>
                  )}
        </div>
      </section>
      
      <ToastContainer />
    </>
  );
}
