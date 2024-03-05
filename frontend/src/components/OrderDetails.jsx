import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function OrderDetails() {
  const { id } = useParams();
  const { isAuth } = useSelector((store) => store.user);
  const [orderDetails , setDetials] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(
    () => async () => {
      if (!isAuth) {
        navigate("/signin");
        return;
      }
      try {
        const { data } = await axios.get(`/api/v1/order/details/${id}`);
        setDetials(data.order);
      } catch (error) {
        toast.error(error.response.data.message, {
          theme: "dark",
          position: "bottom-right",
        });
      }
    },
    [isAuth, navigate, dispatch, id]
  );
  return (
    <div>
      <MetaData title={"Ecom - Order Details"} />
      {orderDetails===null ? (
        <Loading />
      ) : (
        <div>
          <section class="text-gray-400 bg-gray-900 body-font">
            <div class="container px-5 py-8 mx-auto">
              <div class="flex flex-col text-center w-full mb-4">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                  Order Detials
                </h1>
              </div>
              <h1 class="sm:text-xl text-lg font-medium title-font mb-4 text-white">
                Order Status :
                {orderDetails.orderStatus==="Processing" && (<span className="text-blue-500 mx-2 bg-gray-200 pr-2 py-1 rounded-sm"> {orderDetails.orderStatus}</span>) } 
                {orderDetails.orderStatus==="Delivered" && (<span className="text-green-500 mx-2 bg-gray-200 pr-2 py-1 rounded-sm"> {orderDetails.orderStatus}</span>) } 
                {orderDetails.orderStatus==="Shipped" && (<span className="text-yellow-500 mx-2 bg-gray-200 pr-2 py-1 rounded-sm"> {orderDetails.orderStatus}</span>) } 
                {orderDetails.orderStatus==="Cancelled" && (<span className="text-red-500 mx-2 bg-gray-200 pr-2 py-1 rounded-sm"> {orderDetails.orderStatus}</span>) } 
              </h1>
              <h1 class="sm:text-xl text-lg font-medium title-font mb-4 text-white">
                Ordered Items
              </h1>
              <div class="flex flex-wrap -m-2">
                {orderDetails.orderItems && orderDetails.orderItems.map((it) => (
                  <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <Link to={`/product/${it.product._id}`}>
                      <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg bg-gray-800">
                        <img
                          alt="team"
                          class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={it.product.images[0].url}
                        />
                        <div class="flex-grow">
                          <h2 class="text-white title-font font-medium">
                            {it.product.name}
                          </h2>
                          <p class="text-gray-400">Quantity : {it.quantity}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {orderDetails.shippingInfo && (<div className="flex sm:flex-row flex-col gap-5 ">
                <div className="flex flex-col w-1/2 ">
                  <h1 class="sm:text-xl text-lg font-medium title-font mb-4 text-white mt-4">
                    Shipping Details
                  </h1>
                  <span> {orderDetails.shippingInfo.address}</span>
                  <span> {orderDetails.shippingInfo.city}</span>
                  <span> {orderDetails.shippingInfo.state}</span>
                  <span> {orderDetails.shippingInfo.country}</span>
                  <span> {orderDetails.shippingInfo.pincode}</span>
                  <span> {orderDetails.shippingInfo.phoneNo}</span>
                </div>
                <div className="flex flex-col w-1/2 ">
                  <h1 class="sm:text-xl text-lg font-medium title-font mb-4 text-white mt-4">
                    Totaling Details
                  </h1>
                  <span> Subtotal : {orderDetails.itemPrice}</span>
                  <span> TAX (18%) : {orderDetails.taxPrice}</span>
                  <span> Shipping Price : {orderDetails.shippingPrice}</span>
                  <span className="font-semibold text-lg"> Total Amount : {orderDetails.totalPrice}</span>
                  <span>
                    {" "}
                    Payment Status : {orderDetails.paymentInfo.status}
                  </span>
                  <span>
                    {" "}
                    Payment Transaction Id : {orderDetails.paymentInfo.id}
                  </span>
                </div>
              </div>)}
              <div>
                {orderDetails.orderStatus!=="Delivered" && orderDetails.orderStatus!=="Cancelled" && (
                  <button
                  class="flex ml-auto text-white bg-red-500 mx-2 px-2 py-2 rounded-sm-500 border-0 focus:outline-none hover:bg-yellow-600 rounded"
                  >Cancel Order</button>

                )}
              </div>
            </div>
          </section>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
