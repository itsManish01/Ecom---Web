import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";




export default function ProductCard({product}) {
    const options = {
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        value : product.rating,
        isHalf : true,
        size : window.innerWidth < 600 ?  15 : 20,
    }
  return (
      <div class="p-4 md:w-1/4 hover:translate-y-1 hover:scale-105 duration-75">
        <Link to={`/product/${product._id}`}>
        <div class="h-full border-2 border-gray-800 hover:border-gray-500 rounded-lg overflow-hidden">
          <img class="lg:h-60 md:h-36 object-cover object-center" src={product.images[0].url} alt="img" />
          <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{product.category}</h2>
            <h1 class="title-font text-lg font-medium text-white mb-1">{product.name}</h1>
            <ReactStars {...options }/> ({product.numOfReviews}) reviews
            <p class="leading-relaxed mb-3">{product.description}</p>
            <p class="leading-relaxed text-yellow-500 font-semibold">Rs. {product.price}</p>
          </div>
        </div>
        </Link>
      </div>
  )
}
