import axios from 'axios';
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function GetReview() {
  const [id , setid] = useState("");
  const [reviews,setReviews] = useState(null);

  const handler = async()=>{
    try {
      const {data} = await axios.get(`/api/v1/admin/reviews/${id}`);
      setReviews(data.reviews);
    } catch (error) {
      toast.error(error.res.data.message,{theme:"dark",position:"bottom-right"});
    }
  }
  const deleteHandler=async(itemID)=>{
    try {
      const {data} = await axios.delete('/api/v1/review', {
        params : {
          productID : itemID
        }
      });
      if(data.success){
        toast.success("Deleted Successfully !",{theme:"dark", position:"bottom-right"});
      }
      handler();
    } catch (error) {
      toast.error(error.response.data.message,{theme:"dark", position:"bottom-right"});
    }
  }

  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-col text-center w-full mb-8">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">Enter Product ID</h1>
        </div>
        <div class="flex w-2/3 sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-yspace-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <input onChange={(e)=>{
              setid(e.target.value)
              console.log(id)
            }}
            value={id} 
            type="text" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <button  onClick={handler}
          class="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Go</button>
        </div>
      </div>
      {reviews && (
        <>
        <div class="w-full mx-auto overflow-auto">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    Sn. No.
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    ReviewID
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    UserID
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    User Name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Rating
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Description
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
                {reviews.map((item,index)=>{
                  return (
                    <tr key={item._id}> 
                      <td class="border-t-2 border-gray-800 px-4 py-3">{index+1}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item._id}</td>
                      <td class="border-t-2 border-gray-800 px-4 font-semibold text-red-500 py-3">{item.user}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item.name}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3 text-lg">{item.rating}</td>
                      <td class="border-t-2 border-gray-800 px-5 py-3">{item.comment}</td>
                      <td class="border-t-2 border-gray-800 px-5 py-3">{item.createdAt}</td>
                      <td class="border-t-2 border-gray-800 w-10 text-center">
                        <div className="flex flex-row gap-2">
                        <button title="delete" onClick={()=>{
                          deleteHandler(id);
                        }} className="hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <ToastContainer/>
    </section>
  )
}
