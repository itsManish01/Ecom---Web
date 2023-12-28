import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../actions/cartActions';

export default function CartItem({product}) {
  const dispatch = useDispatch();
  return (
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-1 mb-4 border-gray-800 sm:flex-row flex-col">
        <img alt="img" className='w-1/3 m-5 rounded-md' src={product.image}/>
        <div className='flex flex-row justify-evenly w-full'>
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">

        <Link to={`/product/${product.product}`} 
        class="text-white text-lg title-font font-medium mb-2">{product.name}</Link>
        <p class="leading-relaxed text-base">Quantity : <span className='text-green-600 font-semibold'> {product.quantity} </span> </p>
        <p class="leading-relaxed text-base font-semibold text-orange-500">Price : {product.price}</p>
        </div>
        <button onClick={()=>{
          dispatch(removeFromCart(product.product))
        }}>
        <i class="fa-solid fa-trash text-2xl hover:text-red-500" title="Remove from cart"></i>
        </button>
      </div>
    </div>
  )
}
