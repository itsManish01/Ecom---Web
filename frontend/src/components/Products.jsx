import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getProduct } from "../actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./CSS/pagination.css";
import MetaData from "./MetaData";

const categories = [
  "All",
  "Mobiles",
  "Footwear",
  "Electronics",
  "Kitchen",
  "BodyProducts",
  "Medical",
  "Styling",
];

export default function Products() {
  const { loading, products, error, productsCount } = useSelector(
    (store) => store.products
  );
  const [ratingAbove, setRatingAbove]  = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [priceR, setPriceR] = useState(500000);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, [priceL, priceR], category,ratingAbove));
    if (error) {
      toast.error(error, { theme: "dark" });
    }
  }, [dispatch, keyword, currentPage, priceR, priceL, error, category ,ratingAbove]);

  return (
    <>
    <MetaData title ={"Ecom - Products"} />
      <div class="container px-5 py-4 mx-auto">
        <h1 class="text-3xl font-medium title-font text-white  text-center">
          Products
        </h1>
      </div>
      <section class="text-gray-400 bg-gray-900 body-font  mb-4 ">
        <div class="bg-gray-800 bg-opacity-50  py-2 px-8 flex flex-col items-center w-full ">
          <h2 class="text-white text-lg font-medium title-font  ">Filter</h2>
          <div className="w-full flex flex-col md:flex-row justify-evenly ">
            <div class="relative mb-8">
              <p class="leading-7 text-sm text-gray-400">Price Range</p>
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
                class="w-2/5 mx-1 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                class="w-2/5 mx-1 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-8">
              <label for="email" class="leading-7 text-sm text-gray-400">
                Category
              </label>

              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-2 px-2 leading-8 transition-colors duration-200 ease-in-out"
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
            <div class="relative mb-8">
              <label for="steps-range" class="leading-7 text-sm text-gray-400">
                Rating Above : {ratingAbove}
              </label>
              <input
                id="labels-range-input"
                type="range"
                min="0"
                max="5"
                onChange={(e)=>{
                    setRatingAbove(e.target.value);
                }}
                step="0.5"
                class=" w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5  mx-auto">
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
      {products && (
        <section className="flex flex-row justify-center py-4">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={8}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          ></Pagination>
        </section>
      )}
      <ToastContainer />
    </>
  );
}
