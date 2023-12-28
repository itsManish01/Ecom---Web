import React, { useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);

  const updateHandler = async () => {
    try {
      const { data } = await axios.put("/api/v1/me/update", { name, email });
      toast.success("Profile Updated", { theme: "dark" , position:"bottom-right"});
      dispatch({
        type: "USER_LOAD_SUCCESS",
        payload: data.user,
      });
      navigate("/account");
      // console.log(data);
    } catch (error) {
      toast.error(error.response.data.message, { theme: "dark", position:"bottom-right" });
    }
  };
  return (
    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left flex flex-col gap-8">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
        Update Credentials
      </h1>
      <div>
        <label>User Name</label>
        <input
          type="text"
          value={name}
          className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <button
        onClick={updateHandler}
        className="text-white w-1/3 bg-yellow-500 h-12 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
      >
        Update
      </button>
      <ToastContainer />
    </div>
  );
}
