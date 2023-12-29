import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const { isAuth, user } = useSelector((store) => store.user);
  const {cartItems} = useSelector(store=>store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged Out Successfully",{theme:"dark", position:"bottom-right"})
    navigate("/");
  };
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="/#"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <Link to="/">
            <span className="ml-3  text-yellow-500 text-3xl">
              Ecom <i className ="fa-solid fa-truck-fast"></i>
            </span>
          </Link>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-white" to="/">
            Home
          </Link>
          <Link className="mr-5 hover:text-white" to="/products">
            Products
          </Link>
          <Link className="mr-5 hover:text-white" to="/#">
            Contact
          </Link>
          <Link className="mr-5 hover:text-white" to="/#">
            About
          </Link>
        </nav>
        <div className="flex gap-5 mx-2 text-xl">
          <Link to="/search">
            <i
              title="search"
              className="fa-solid fa-magnifying-glass hover:text-white"
            ></i>
          </Link>
          <Link to="/cart" >
            {" "}
            <i
              title={`cart ${cartItems.length}`}
              style={{
                color : cartItems.length ? "white" : "gray",
              }}
              className="fa-solid fa-cart-shopping hover:text-white"
            ></i>
          </Link>
          {isAuth && user ? (
            <div className="flex flex-row gap-3">
              <Link to="/account">
                <img
                  src={user.avatar.url}
                  alt="profile"
                  title="account"
                  className="hover:border-yellow-500 w-8 h-8 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                />
                </Link>
                {isAuth && user.role==="admin" && (
                <Link to="/dashboard" title="DashBoard">
                <i className ="fa-solid fa-chart-simple hover:text-pink-600"></i>
                </Link>
                )}
              <Link to="/orders/me" title="orders">
                <i className ="fa-solid fa-truck  hover:text-yellow-500"></i>
              </Link>
              <button title="logout" onClick={logoutHandler}>
                <i className ="fas fa-sign-out  hover:text-red-700"></i>
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <i className ="fa-solid fa-user  hover:text-white"></i>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer/>
    </header>
  );
}
