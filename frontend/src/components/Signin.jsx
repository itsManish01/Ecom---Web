import React, { useEffect, useState } from "react";
import profile from "./images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, register } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [type, setType] = useState("Login");
  const [email, setEmail] = useState("");
  const [passowrd, setPassowrd] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error , loading, isAuth} = useSelector(store=>store.user) 
  const changeProfile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const loginHandler=()=>{
    dispatch(login(email,passowrd));
  }
  const registerHandler=()=>{
    dispatch(register(name,email,passowrd,avatar));
  }
  useEffect(()=>{
    if(error){
      toast.error(error,{theme:"dark"})
    }
    dispatch(clearErrors);
    if(isAuth){
      navigate('/')
    }

  },[dispatch,error,loading,isAuth,navigate])

  return (
    <>
      <section className ="text-gray-400 bg-gray-900 body-font">
        <div className ="container px-5 py-8 mx-auto">
          <div className ="flex flex-col text-center w-full mb-12">
            <div className="pb-16 text-white">
              <button
                style={{
                  background:
                    type === "Login" ? "rgb(234 179 8)" : "rgb(55 65 81)",
                }}
                className=" p-2 rounded-l font-semibold"
                onClick={() => {
                  setType("Login");
                  setAvatar(profile);
                }}
              >
                Login
              </button>
              <button
                style={{
                  background:
                    type === "SignUp" ? "rgb(234 179 8)" : "rgb(55 65 81)",
                }}
                className=" p-2 rounded-r font-semibold"
                onClick={() => setType("SignUp")}
              >
                SignUp
              </button>
            </div>
            <h1 className ="sm:text-3xl text-2xl font-medium title-font  text-white">
              User {type}
            </h1>
          </div>
          {type === "Login" ? (
            <div className ="flex lg:w-2/3 w-full sm:flex-col  gap-3 flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div className ="relative sm:mb-0 flex-grow w-full">
                <label className ="leading-7 text-sm text-gray-400">Email</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className ="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className ="relative sm:mb-0 flex-grow w-full">
                <label className ="leading-7 text-sm text-gray-400">Password</label>
                <input
                  onChange={(e) => {
                    setPassowrd(e.target.value);
                  }}
                  type="password"
                  className ="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex  flex-row justify-between w-full">
                <a className="text-yellow-500" href="/#">
                  Forgot Password?
                </a>
                <button 
                onClick={loginHandler}
                className ="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div className ="flex lg:w-2/3 w-full sm:flex-col  gap-3 flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div className ="relative sm:mb-0 flex-grow w-full">
                <label className ="leading-7 text-sm text-gray-400">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className ="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className ="relative sm:mb-0 flex-grow w-full">
                <label className ="leading-7 text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className ="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className ="relative sm:mb-0 flex-grow w-full">
                <label className ="leading-7 text-sm text-gray-400">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassowrd(e.target.value);
                  }}
                  className ="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex  flex-row justify-between w-full">
                <div>
                  <img
                    src={avatar}
                    className ="w-14 h-14 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                    alt="preview"
                  />
                  <label className ="leading-7 text-sm text-gray-400 mx-2">
                    Profile Pic:
                  </label>
                  <input
                    onChange={changeProfile}
                    className="p-2 bg-gray-600 rounded-md"
                    type="file"
                  />
                </div>
                <button onClick={registerHandler} 
                className ="text-white bg-yellow-500 h-12 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
