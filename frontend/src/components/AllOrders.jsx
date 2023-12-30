import React, { useEffect } from "react";
import { useNavigate , Link} from "react-router-dom";
import {
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
} from "../constants/orderConstants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
export default function AllOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.user);
  const { orders, loading } = useSelector((store) => store.orders);
  useEffect(
    () => async () => {
      if (isAuth) {
        try {
          dispatch({
            type: ALL_ORDER_REQUEST,
          });
          const { data } = await axios.get("/api/v1/orders/me");
          dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders,
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Login First");
        navigate("/signin");
      }
    },
    [isAuth, navigate, dispatch]
  );

  return (
    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left flex flex-col gap-8">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
        My Orders
      </h1>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {orders.map((item) => {
              return (
                <Link to={`/order/details/${item._id}`} class="w-full p-4">
                  <div class="border border-gray-700 border-opacity-75 p-3 rounded-lg">
                    <h2 class="text-lg text-white font-medium title-font">
                      {item.orderStatus==="Processing" && (<span className="text-blue-700 bg-gray-300 rounded-sm p-1">Processing</span>)}
                      {item.orderStatus==="Shipped" && (<span className="text-yellow-700 bg-gray-300 rounded-sm p-1">Shipped</span>)}
                      {item.orderStatus==="Delivered" && (<span className="text-green-700 bg-gray-300 rounded-sm p-1">Delivered</span>)}
                      {item.orderStatus==="Cancelled" && (<span className="text-red-700 bg-gray-300 rounded-sm p-1">Cancelled</span>)}
                    </h2>
                    <div className="flex sm:flex-row flex-col justify-between">

                    <p class="leading-relaxed text-base">
                      <span className="font-semibold text-yellow-500">Items : </span> {item.orderItems.map((product)=>{
                        return (<p>{product.product.name} {`(${product.quantity})`}</p>)
                      })}
                    </p>
                    <p className="flex flex-col">
                    <span className="font-semibold text-yellow-500">Total Amount : </span> {item.totalPrice}
                    <span className="font-semibold text-yellow-500">Status : </span> <span className="text-green-500 font-semibold">{item.paymentInfo.status}</span>
                    </p>
                    <p className="flex flex-col">
                    <span className="font-semibold text-yellow-500">Shipping at: </span>
                    <p>{item.shippingInfo.address}</p>
                    <p>{item.shippingInfo.state}</p>
                    <p>{item.shippingInfo.country}</p>
                    <p>{item.shippingInfo.pincode}</p>
                    </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
