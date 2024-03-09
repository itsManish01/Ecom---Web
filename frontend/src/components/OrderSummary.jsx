import React from "react";
import { useSelector } from "react-redux";
import MetaData from "./MetaData";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function Payment() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { cartItems, shippingInfo } = useSelector((store) => store.cart);
  var subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.price * element.quantity;
  });
  const shippingCharges = subtotal >= 1000 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;

  const paymentHandler = async () => {
        const { data: { key } } = await axios.get("/api/v1/getkey")
        const { data: { order } } = await axios.post("/api/v1/checkout", {
            amount : total
        })
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Ecom payment Gateway",
            description: "RazorPay",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA8CAYAAAA+CQlPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATQSURBVGhD7ZpvSBt3GMe/Mb0kp53ReVG3ZkzqYMUVZvfH6tbNwsoGpRtsyDro2MTSQgeDdpXJ2Bilo2yFrtsLYcwy6V4IEwq+sLQo7QsLQ7e+KDInlaJYjJsabTRTk4v5s7v10V4SL7k/OVm9+0Dw+f6Mka/P78/ze05bcfnTCZiQPPpqOizjZsMybjYs42bDMm42LONmwzJuNtTfztgEjr/Kw+sinQOCo060D9ngI70RqDLufXYZncf84Ow0kDPsCA6Xofk7Bn00YjQqpnoU3zYaYVokhsKqORzfS3IDUG58RwTbt1JsCMLyqYxRbDzKjedtrkaNdZyZDdldvW7vIs4dWEKhgwbyYnA4V0gYxIoLkSjFIhEGE3dY9F5m8f0kjeUIWeNnWnxoeGrjNpvMsBj+xYO3r9tI60fWuHdbFMdeiMJJWg9OLoLndgXA6fqw3JpXX7lppOmwHy21y6S0kjvziozXlSfAMSS0UBDF+03TqC7OsnRS17gjDEdawZQb89mN71vAyMF5EsYSHPDixZ8eOPVuD+PnT6bhTVsi+s1nP87+YhCkcKPxjbnw4fky+HgaWCOEqvf86HpN+yo1do2zUXR+NYlqN+kspGZ8FfnMF6C/lUPjIEkVGFvAhOyYWaRYB/KZX0LduyG8SUoNshlPK2C0oLLokcv4KutnvgiXjrjxOSmlyGb8wO55cG5hV2V1vHJc6YmZ77iVT0ofshnXXsDE8cSuRVRvC5FWTmTcg56hzKuvcOcC6ivCpES0ZdygzY3HlQtTqCRlLEYbZxJ4vVwoP0lmwvvSAj4Szn8924NyjDZetYSbJ2ZRSPL/Q443t82OZdxsbALji3jrmwW0vazucNJp3IXZIQ+6L5ehd6AIwZw1bITqLVCE/mtlwmd7MDzF0vh6ROEomUd9YwBtFTSkAO27Ou9G7/kifDxGWqR0BZ3NCu7dWQgOPo7m1uSnKocOBvDlvsz3xNGuJ7H/CoksaM747O/uZNMiMwxO9ug88FaK0f1j+qOkjs4i9M2RWJdH4BumUAEajefjzuD6TQDfDWfywz/ehUgoy0s6QSadaF+3xLdhYFRapzMPfn5O+KNcLMbRcfqWApRP9R3LuHnST1PdjtFOL/Zf+08ko/R9EpI6ugsczjYXoP2+SiLpfQEPTn+aj477SjXKM36bgW8tEzFU7uZRT0pK0yvCVZZicWb4RijMwMBdSSbdS3ijhmIppWHUStvdfzOaTYuomOoMBkYklXqFH+dawji0uuEKtXzL4Xs4USPppM6w6J2gOAPdv7KYpVhsK1V/cA9tNQl4aaSqgkfXZ7NrWrwxDN/S0/1UM9VFSnlcPzUFb+rvXBEGmNSFmY/+Vo/itlDTET9apH80kZgTkbhwXDEpp8R4OY6ecep6lq5uc5tx4nRHSXrzMc20sMH1cPhCRS+s/SInzI6Uu5+dTzcdKEH7BX2mRezsVu4UxYq4O+HA1T9Z7NnJ41E2TqMSQoXo7+DwTo9NXXc2bsPVvgIUlCbwzGM87GkpYRC8XYqzX+fjh39oSAfqpnoKVSVRNOyJwuNKgA/nwfeHA5fGcvC/LMJ+0fB8BLVlcThdNvDTW9D92xb0qW/qyKLL+MOMxgLm4ccybjYs42bDMm42TGoc+Be9QbRnw/cHvgAAAABJRU5ErkJggg==",
            order_id: order.id,
            prefill: {
                name: user.name,
                email: user.email,
            },
            handler: async (response) => {
              try {
                let { data } = await axios.post("/api/v1/paymentverification", response);
                if(data.success){
                  navigate(`/order/paymentsuccess/${response.razorpay_payment_id}`);
                }else toast.error("Invalid transation IDs",{theme:"dark",position:"bottom-right"})
              } catch (error) {
                console.log(error);
                toast.error(error.response.data.message,{theme:"dark",position:"bottom-right"});
              }
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        
  }

  return (
    <>
      <MetaData title={"Ecom - Order Summary"} />
      <progress className="w-full h-1" value={0.5} />
      <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div class="container px-5 py-5 mx-auto">
          <p class="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-1 text-center">
            Order Summary
          </p>
          <div class="flex flex-wrap sm:flex-row flex-col text-white text-lg">
            <div class="p-12 md:w-1/2 flex flex-col items-start">
              <span class="inline-block py-1 px-2 my-4 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">
                SHIPPING INFO
              </span>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>Name :</p>{" "}
                <span className="font-semibold text-yellow-600">
                  {" "}
                  {user.name}{" "}
                </span>
              </p>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>Address :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  {" "}
                  {shippingInfo.address}{" "}
                </span>
              </p>
              <p class="leading-relaxed w-full m4-8 flex flex-row justify-between">
                <p>Country :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  {shippingInfo.country}
                </span>
              </p>
              <p class="leading-relaxed w-full m4-8 flex flex-row justify-between">
                <p>State :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  {shippingInfo.state}
                </span>
              </p>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>City :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  {" "}
                  {shippingInfo.city}
                </span>
              </p>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>Pincode :</p>
                <span className="font-semibold text-yellow-500">
                  {" "}
                  {shippingInfo.pincode}
                </span>
              </p>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>PhoneNo :</p>
                <span className="font-semibold text-yellow-500">
                  {" "}
                  {shippingInfo.phoneNo}
                </span>
              </p>
            </div>
            <div class="p-12 md:w-1/2 flex flex-col items-start">
              <span class="inline-block py-1 px-2 my-4 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">
                BILLING
              </span>
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between">
                <p>Subtotal : </p>{" "}
                <span className="font-semibold text-yellow-500">
                  Rs. {subtotal}{" "}
                </span>
              </p>
              <p class="leading-relaxed w-full m4-8 flex flex-row justify-between">
                <p>Shipping Charges :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  Rs. {shippingCharges}
                </span>
              </p>
              <p class="leading-relaxed w-full m4-8 flex flex-row justify-between">
                <p>Tax [18%] :</p>{" "}
                <span className="font-semibold text-yellow-500">Rs. {tax}</span>
              </p>
              <hr class="w-full border-1 my-4 border-yellow-500 " />
              <p class="w-full leading-relaxed m4-8 flex flex-row justify-between text-2xl">
                <p className="font-semibold text-green-400">Total Amount :</p>{" "}
                <span className="font-semibold text-yellow-500">
                  Rs. {total}
                </span>
              </p>
            </div>
          <button 
          onClick={paymentHandler}
          className="text-center w-1/5 mx-auto py-2 bg-yellow-500 hover:translate-y-1 duration-75 font-semibold rounded-lg"
          >
            Proceed to payment
          </button>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}
