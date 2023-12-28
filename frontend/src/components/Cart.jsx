import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  var total = 0;
  cartItems.forEach((element) => {
    total += Number(element.price) * element.quantity;
  });

  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      {cartItems.length ? (
        <>
          <div class="container px-5 pt-4 mx-auto  flex flex-col justify-center">
            <p className="sm:text-4xl text-3xl mb-4 mx-auto font-medium text-white">
              Cart Items
            </p>
            {cartItems.map((item)=>{
              return (<CartItem key={item.product} product={item}/>)
            })}
          </div>
          <div className="total px-10 w-full flex flex-row justify-around">
            <p className="font-semibold text-lg">
              Total : <span className="text-yellow-500">{total}</span>{" "}
            </p>
            <p>Check Out</p>
          </div>
        </>
      ) : (
        <>
        <div class="container px-5 pt-4 mx-auto gap-8 my-24 flex flex-col justify-center">
          <p className="sm:text-4xl text-3xl mb-4 mx-auto font-medium text-white">
           Your Cart is empty!
          </p>
          <i class="fa-regular text-red-800 fa-circle-xmark sm:text-4xl text-3xl mb-4 mx-auto font-medium"></i>
          <Link to ="/products"  className="px-8 py-2 mx-auto bg-yellow-500 text-white hover:scale-110 duration-100 rounded-lg">Products</Link>
          </div>
        </>
      )}
    </section>
  );
}
