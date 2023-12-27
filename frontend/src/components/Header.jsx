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
          <a className="mr-5 hover:text-white" href="/">Home</a>
          <a className="mr-5 hover:text-white" href="/products" >Products</a>
          <a className="mr-5 hover:text-white" href="/#">Contact</a>
          <a className="mr-5 hover:text-white" href="/#">About</a>
        </nav>
        <div className="flex gap-5 mx-2 text-xl">
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass hover:text-white"></i>
          </Link>
          <a href="/#">
            {" "}
            <i className="fa-solid fa-cart-shopping hover:text-white"></i>
          </a>
          <Link to="/signin">
          <i class="fa-solid fa-user  hover:text-white"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
