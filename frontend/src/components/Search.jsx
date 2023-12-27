import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./MetaData";
export default function Search({history}) {
    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler=(e)=>{
        console.log(keyword)
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products")
        }
    }
  return (
    <>
    <MetaData title ={"Ecom - Search"} />
    <section class="text-gray-400 bg-gray-900 body-font py-32 sm:py-40 md:py-48 ">
      <div class="container px-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Search any Product
          </h1>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            
            <input
            placeholder="Search.."
              onChange={(e)=>setKeyword(e.target.value)}
              type="text"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button 
          onClick={submitHandler}
          class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            Search
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
