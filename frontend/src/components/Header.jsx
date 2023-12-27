import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../actions/userActions"

export default function Header() {
  const { isAuth, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const logoutHandler =()=>{
    dispatch(logout);
    navigate("/api/v1/")
  }
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="/#"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <Link to="/">
            <span className="ml-3  text-yellow-500 text-3xl">
              Ecom <i class="fa-solid fa-truck-fast"></i>
            </span>
          </Link>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white" href="/">
            Home
          </a>
          <a className="mr-5 hover:text-white" href="/products">
            Products
          </a>
          <a className="mr-5 hover:text-white" href="/#">
            Contact
          </a>
          <a className="mr-5 hover:text-white" href="/#">
            About
          </a>
        </nav>
        <div className="flex gap-5 mx-2 text-xl">
          <Link to="/search">
            <i title="search" className="fa-solid fa-magnifying-glass hover:text-white"></i>
          </Link>
          <a href="/#">
            {" "}
            <i title="cart" className="fa-solid fa-cart-shopping hover:text-white"></i>
          </a>
          {isAuth && user ? (
            <div className="flex flex-row gap-3">
              <Link to="/account">
                <img src={user.avatar.url} alt="profile"
                title ="account"
                class="w-8 h-8 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                />
              </Link>
              <button title="logout" onClick={logoutHandler}>
                <i  class="fas fa-sign-out  hover:text-white"></i>
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <i class="fa-solid fa-user  hover:text-white"></i>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
