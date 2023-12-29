import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from 'react-redux';
import MetaData from './MetaData';

export default function ForgotPassword() {
    const [password , setPassword] =useState("");
    const {token} = useParams(); 
    const [cnfPassword , setCnfPassword] =useState("");
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {isAuth} = useSelector(store=>store.user)

    console.log(token);
    const resetHandler= async()=>{
        try {
            const {data} = await axios.put(`/api/v1/password/reset/${token}`,{
                password : password,
                confirmPassword : cnfPassword
            });
            dispatch( {
                type : "USER_LOAD_SUCCESS",
                payload : data.user,
            })
            navigate("/");
            toast.success("Password Changed successfully", {theme : "dark", position:"bottom-right"});
        } catch (error) {
            toast.error(error.response.data.message, {theme : "dark", position:"bottom-right"});
        }
    }
    useEffect(()=>{
        if(isAuth){
            navigate("/")
        }
    },[isAuth,navigate])

  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <MetaData title={"Ecom - Reset Password"}/>
  <div class="container px-5 py-8 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Reset Password</h1>
    </div>
    <div class="flex gap-8 lg:w-1/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
      <div class="relative sm:mb-0 flex-grow w-full">
        <label  class="leading-7 text-sm text-gray-400">New Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="text" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative sm:mb-0 flex-grow w-full">
        <label class="leading-7 text-sm text-gray-400">Confirm new Password</label>
        <input onChange={(e)=>setCnfPassword(e.target.value)} type="text" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button onClick={resetHandler} class="text-white  bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Reset</button>
    </div>
  </div>
  <ToastContainer/>
</section>
  )
}
