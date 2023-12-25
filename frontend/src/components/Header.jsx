import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="/#" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Link to="/">
            <span className="ml-3  text-yellow-500 text-3xl">
              Ecom <i class="fa-solid fa-truck-fast"></i>
            </span>
          </Link>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white" href="/#">Home</a>
          <a className="mr-5 hover:text-white" href="/#" >Product</a>
          <a className="mr-5 hover:text-white" href="/#">Contact</a>
          <a className="mr-5 hover:text-white" href="/#">About</a>
        </nav>
        <div className="flex gap-2 mx-2 text-xl">
          <a href="/#">
            <i className="fa-solid fa-magnifying-glass hover:text-white"></i>
          </a>
          <a href="/#">
            {" "}
            <i className="fa-solid fa-cart-shopping hover:text-white"></i>
          </a>
        </div>
        <div className="flex gap-2 font-semibold">
          <button className="inline-flex items-center bg-yellow-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-800 rounded text-white text-base mt-4 md:mt-0">
            Sign Up
          </button>
          <button className="inline-flex items-center bg-yellow-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-800 rounded  text-white text-base mt-4 md:mt-0">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
