import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from './MetaData';
import { clearCart } from '../actions/cartActions';

export default function OrderPlaced() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearCart());
  },[dispatch])
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <MetaData title={"Ecom - Success"} />
      <progress className="w-full h-1" value={1} />
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Your Order has been placed</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl"><i className=" text-yellow-500 fa-solid fa-check"></i></p>
      <Link to="/account" className="mx-auto px-4 py-2 bg-yellow-500 text-white my-4 hover:bg-yellow-600 rounded-md" >See Your Orders</Link>
    </div>
   
  </div>
</section>
  )
}
