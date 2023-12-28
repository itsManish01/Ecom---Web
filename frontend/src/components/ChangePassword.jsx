import React, { useState } from "react";
import axios from "axios";

import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [old, setOld] = useState("");
  const [new1, setNew1] = useState("");
  const [new2, setNew2] = useState("");
  const updateHandler = async () => {
    try {
        const { data } = await axios.put("/api/v1/password/update", {
            oldPassword: old,
            newPassword: new1,
            confirmPassword: new2,
        });
        setOld("");
        setNew1("");
        setNew2("");
      toast.success("Password Changed", { theme: "dark" , position:"bottom-right"});
      dispatch({
        type: "USER_LOAD_SUCCESS",
        payload: data.user,
      });
      navigate("/account");
    } catch (error) {
        toast.error(error.response.data.message, { theme: "dark", position:"bottom-right" });
    }
  };
  const [pwVis,setPwVis] = useState("passowrd");
  return (
    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left flex flex-col gap-8">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
        Change Password
      </h1>
      <div>
        <label>Old Password</label>
        <div>

        <input
          type={pwVis}
          className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => {
            setOld(e.target.value);
          }}
          />
          </div>
      </div>
      <div>
        <label>New Password</label>
        <input
          type={pwVis}
          className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => {
            setNew1(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input
          type={pwVis}
          className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => {
            setNew2(e.target.value);
          }}
        />
      </div>
      <div>
      <button
        onClick={updateHandler}
        className="text-white w-1/3 bg-yellow-500 h-12 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
        >
        Change
      </button>

      <button title="show password"
            onClick={()=>{
              if(pwVis==="text"){setPwVis("password")}
              else {setPwVis("text")}
            }}
          >
           {pwVis==="password"  ? (  <i class="fa-regular fa-eye text-lg px-4 hover:text-cyan-300 "></i>)
            :
           ( <i class="fa-solid fa-eye text-lg px-4 hover:text-cyan-300"></i>)}
          </button>

        </div>
      <ToastContainer />
    </div>
  );
}
