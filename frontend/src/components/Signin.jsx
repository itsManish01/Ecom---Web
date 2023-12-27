import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const [type, setType] = useState("Login");
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <div className="pb-16 text-white">
              <button
                style={{
                  background:
                    type === "Login" ? "rgb(234 179 8)" : "rgb(55 65 81)",
                }}
                className=" p-2 rounded-l font-semibold"
                onClick={() => setType("Login")}
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
            <h1 class="sm:text-3xl text-2xl font-medium title-font  text-white">
              User {type}
            </h1>
          </div>
          {type === "Login" ? (
            <div class="flex lg:w-2/3 w-full sm:flex-col  gap-3 flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div class="relative sm:mb-0 flex-grow w-full">
                <label  class="leading-7 text-sm text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative sm:mb-0 flex-grow w-full">
                <label class="leading-7 text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex  flex-row justify-between w-full">
              <a className="text-yellow-500" href="/#" >Forgot Password?</a>
              <button class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                Login
              </button>
              </div>
            </div>
          ) : (
            <div class="flex lg:w-2/3 w-full sm:flex-col  gap-3 flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div class="relative sm:mb-0 flex-grow w-full">
                <label  class="leading-7 text-sm text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative sm:mb-0 flex-grow w-full">
                <label for="email" class="leading-7 text-sm text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative sm:mb-0 flex-grow w-full">
                <label class="leading-7 text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex  flex-row justify-between w-full">
                <div>
                  <label class="leading-7 text-sm text-gray-400 mx-2">
                    Profile Pic: 
                  </label>
                  <input
                  className="p-2 bg-gray-600 rounded-md"
                  type="file"/>
                </div>
              <button class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
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
