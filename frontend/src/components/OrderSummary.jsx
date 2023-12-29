import React from "react";
import { useSelector } from "react-redux";
import MetaData from "./MetaData";
import { Link } from "react-router-dom";

export default function Payment() {
  const { user } = useSelector((store) => store.user);
  const { cartItems, shippingInfo } = useSelector((store) => store.cart);
  var subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.price * element.quantity;
  });
  const shippingCharges = subtotal >= 1000 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;
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
          <Link className="text-center w-1/5 mx-auto py-2 bg-yellow-500 hover:translate-y-1 duration-75 font-semibold rounded-lg" to="/order/payment">
            Proceed to payment
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
