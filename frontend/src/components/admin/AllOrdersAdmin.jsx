import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { allOrdersAdmin , deleteOrder} from "../../actions/orderActions";

export default function ALlOrdersAdmin() {
  const [orders,setOrders] = useState(null);
  const [totalAmount,setTotalAmount] = useState(0);
  const [gen,setGen] = useState(false);
  const deleteHandler = async(id)=>{
    try {
      const {data}  = await deleteOrder(id);
      if(data.success){
        toast.success(data.message,{theme:"dark", position:"bottom-right"});
      }
      setGen(!gen);
    } catch (error) {
      toast.error(error.response.data.message,{theme:"dark", position:"bottom-right"});
      
    }
  }
  useEffect(()=>async()=>{
    try {
      const {data} = await allOrdersAdmin(); 
      setOrders(data.orders);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      toast.error(error.response.data.message, {theme:"dark" , position:"bottom-right"});
    }
  },[gen])
  
  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font text-white">
              All Orders -<span className="text-yellow-500"> {orders && (<span>{orders.length}</span>)} </span>
            </h1>
            <h1 class="sm:text-xl font-medium title-font text-white">
              Total Amount -<span className="text-yellow-500">Rs. {totalAmount} </span>
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
                    OrderID
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Status
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Amount
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    User
                  </th>
                  <th class="px-8 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    OrderdAt
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody >

                {!orders ? (<Loading />) : (
                  <>
                {orders.map((item,index)=>{
                  return (
                    <tr key={item._id}> 
                      <td class="border-t-2 border-gray-800 px-4 py-3">{index+1}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">
                      <Link title="Open" to={`/order/details/${item._id}`}><i class="fa-solid text-yellow-500 mx-2 fa-square-arrow-up-right"></i></Link> 
                        {item._id} 
                      </td>
                      {item.orderStatus==="Processing" && (
                        <td class="border-t-2 border-gray-800 px-4 font-semibold text-yellow-500 py-3">{item.orderStatus}</td>
                      )}
                      {item.orderStatus==="Delivered" && (
                        <td class="border-t-2 border-gray-800 px-4 font-semibold text-green-500 py-3">{item.orderStatus}</td>
                      )}
                      {item.orderStatus==="Shipped" && (
                        <td class="border-t-2 border-gray-800 px-4 font-semibold text-orange-500 py-3">{item.orderStatus}</td>
                      )}
                      {item.orderStatus==="Cancelled" && (
                        <td class="border-t-2 border-gray-800 px-4 font-semibold text-red-500 py-3">{item.orderStatus}</td>
                      )}
                      <td class="border-t-2 border-gray-800 px-4 py-3">Rs. {item.totalPrice}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3 text-lg">{item.user}</td>
                      <td class="border-t-2 border-gray-800 px-5 py-3">{item.createdAt.split('T')[0]}</td>
                      <td class="border-t-2 border-gray-800 w-10 text-center">
                        <div className="flex flex-row gap-2">
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
