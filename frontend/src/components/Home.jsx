import React from "react";
import homePng from "./images/home.png";
import Product from "./Product.jsx";
import {HashLink} from 'react-router-hash-link'
import MetaData from "./MetaData.js";
const product = {
     _id : "1354651das5dasfafff1",
     category : "Phones",
     name : "Redmi Note 10",
     price : "15000",
     images : [ 
        { url : "https://www.mplivetoday.com/h-upload/2023/04/02/1112900-xiaomi-redmi-note-12-461b76f035aeaf116607109.webp"}
     ],
     description : "Latest new smartPhone with 108mp camera",
     numOfReviews : 5,
     rating : 4.5,
}


export default function Home() {
  return (
    <>
    <MetaData title= {"Ecom - Home"}/>
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
            "Empower Your Style, Elevate Your Experience: Shop Smart, Shop with
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
      <section className="text-gray-400 bg-gray-900 body-font" id="section" >
        <div className="container px-5 py-16 mx-auto" >
          <div className="flex flex-wrap -m-4" >

            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
          </div>
        </div>
      </section>
    </section>
    </>
  );
}
