import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";

export default function ALlOrdersAdmin() {
  // const dispatch = useDispatch();

  
  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font text-white">
              All Orders -<span className="text-yellow-500"> {allProducts.length} </span>
            </h1>
          </div>
          <div class="w-full mx-auto overflow-auto">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    Sn. No.
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    ProductID
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Stock
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Price
                  </th>
                  <th class="px-8 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    CreatedAt
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody >

                {(loading) ? (<Loading />) : (
                  <>
                {allProducts.map((item,index)=>{
                  return (
                    <tr key={item._id}> 
                      <td class="border-t-2 border-gray-800 px-4 py-3">{index+1}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">
                      <Link title="Open" to={`/product/${item._id}`}><i class="fa-solid text-yellow-500 mx-2 fa-square-arrow-up-right"></i></Link> 
                        {item._id} 
                      </td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item.name}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item.stock}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3 text-lg text-white">Rs.{item.price}</td>
                      <td class="border-t-2 border-gray-800 px-5 py-3">{item.createdAt.split('T')[0]}</td>
                      <td class="border-t-2 border-gray-800 w-10 text-center">
                        <div className="flex flex-row gap-2">
                        <EditProduct product= {item} />
                        <button title="delete" onClick={()=>{
                          deleteHandler(item._id);
                        }} className="hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                  </>
                )}
                
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
