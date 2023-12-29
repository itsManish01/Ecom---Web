import React, {  useState } from 'react'
import MetaData from './MetaData'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ORDER_FAIL, ORDER_REQUEST,ORDER_SUCCESS} from "../constants/orderConstants"
import axios from "axios"
export default function Payment() {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    card : "",
    exp : "",
    pin : ""
  })
  const navigate = useNavigate();
  const { cartItems ,shippingInfo } = useSelector((store) => store.cart);
  var subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.price * element.quantity;
  });
  const shippingCharges = subtotal >= 1000 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;
  const handler = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const confirmHandler=async()=>{
    if(details.card==="" || details.exp==="" || details.pin==="" ){
      toast.error("Please provide details");
      return;
    }
    try {
      dispatch({
        type : ORDER_REQUEST,
      })
      const {data} = await axios.post("/api/v1/order/new",{
        shippingInfo,
        orderItems: cartItems,
        paymentInfo: {
          id : "TRN1234564864531",
          status: "SUCCESS"
        },
        itemPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shippingCharges,
        totalPrice: total,
      });
      dispatch({
        type : ORDER_SUCCESS,
        payload : data.order,
      })
      toast.success("Order Placed Successfully!", {theme:"dark", position:"bottom-right"})
      navigate(`/order/${data.order._id}`);
    } catch (error) { 
      dispatch({
        type : ORDER_FAIL,
        payload :error.response.data.message,
      })
      toast.error(error.response.data.message, {theme:"dark", position:"bottom-right"})
    }    
  }
  
 
  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <MetaData title={"Ecom - Payment"} />
      <progress className="w-full h-1" value={0.75} />
      <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full mb-4">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
            Payment 
          </h1>
        </div>
        <div class="flex gap-8 lg:w-1/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Card</label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              value={details.card}
              type="text"
              name="card"
              placeholder='XXXX XXXX XXXX XXXX'
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>     
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Expire </label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              placeholder='(MM/YY)'
              value={details.exp}
              type="text"
              name="exp"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Pin</label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              type="text"
              placeholder='eg.1234'
              name="pin"
              value={details.pin}
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={confirmHandler}
            class="text-white font-medium bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >Pay - Rs. {total}
          </button>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}
