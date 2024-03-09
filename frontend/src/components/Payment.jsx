import React, { useEffect } from "react";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from "../constants/orderConstants";
import { clearCart } from '../actions/cartActions';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Payment() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const { cartItems, shippingInfo } = useSelector((store) => store.cart);
  var subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.price * element.quantity;
  });
  const shippingCharges = subtotal >= 1000 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;

  
useEffect(()=> async () => {
    try {
      dispatch({
        type: ORDER_REQUEST,
      });
      const { data } = await axios.post("/api/v1/order/new", {
        shippingInfo,
        orderItems: cartItems,
        paymentInfo: {
          id : id,
          status: "SUCCESS",
        },
        itemPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shippingCharges,
        totalPrice: total,
      });
      dispatch({
        type: ORDER_SUCCESS,
        payload: data.order,
      });
      toast.success("Order Placed Successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
      dispatch(clearCart());
    } catch (error) {
      dispatch({
        type: ORDER_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message, {
        theme: "dark",
        position: "bottom-right",
      });
    }
  },[dispatch])

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <MetaData title={"Ecom - Success"} />
      <progress className="w-full h-1" value={1} />
      <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Your Order has been placed</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl"><i className=" text-yellow-500 fa-solid fa-check"></i></p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">TRN ID : {id}</p>
          <Link to="/account" className="mx-auto px-4 py-2 bg-yellow-500 text-white my-4 hover:bg-yellow-600 rounded-md" >See Your Orders</Link>
        </div>
      
      </div> 
      <ToastContainer/>
  </section>
  );
}
