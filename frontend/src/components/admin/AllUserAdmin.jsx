import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
export default function AllUserAdmin() {

  const [users, setUsers] = useState(null);
  
  const changeRole=async(item_id,cur_role)=>{
    try {
      const {data} = await axios.put(`/api/v1/admin/user/${item_id}`,{
        role : cur_role==="user" ? "admin" : "user"
      }) 
      if(data.success){
        toast.success("Role Updated Successfully !",{ theme:"dark", position:"bottom-right"});
        const {data} = await axios.get("/api/v1/admin/users");
        setUsers(data.users);
      }
    } catch (error) {
      toast.error("Error\n" + error.response.data.message, { theme:"dark", position:"bottom-right"});
    }
  }

  const deleteHandler= async(item_id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/admin/user/${item_id}`);
      if(data.success){
        toast.success("User Deleted Successfully !",{ theme:"dark", position:"bottom-right"});
        const {data} = await axios.get("/api/v1/admin/users");
        setUsers(data.users);
      }
    } catch (error) {
      toast.error("Error\n" + error.response.data.message, { theme:"dark", position:"bottom-right"});
    }
  }
  useEffect(()=>async()=>{
    try {
      const {data} = await axios.get("/api/v1/admin/users");
      setUsers(data.users);
    } catch (error) {
      toast.error("Error Fetching all users", { theme:"dark", position:"bottom-right"});
    }
  },[])


  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font text-white">
              All Users -<span className="text-yellow-500"> {users && users.length} </span>
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
                    UserID
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    User Email
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Role
                  </th>
                  <th class="px-8 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Joined At
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody >

                {users==null ? (<Loading />) : (
                  <>
                {users.map((item,index)=>{
                  return (
                    <tr key={item._id}> 
                      <td class="border-t-2 border-gray-800 px-4 py-3">{index+1}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">
                      <p title="Open" ><i class="fa-solid text-yellow-500 mx-2 fa-square-arrow-up-right"></i></p> 
                        {item._id} 
                      </td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item.name}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3">{item.email}</td>
                      <td class="border-t-2 border-gray-800 px-4 py-3 text-lg text-white">{item.role}</td>
                      <td class="border-t-2 border-gray-800 px-5 py-3">{item.createdAt.split('T')[0]}</td>
                      <td class="border-t-2 border-gray-800 w-10 text-center">
                        <div className="flex flex-row gap-2">
                          {item.role==="user" && (
                            <button title="Make Admin" onClick={()=>{
                              changeRole(item._id,item.role);
                            }} className="hover:text-green-500"><i class="fa-solid fa-pencil"></i></button>  
                            )}
                          {item.role==="admin" && (
                            <button title="Remove as Admin" onClick={()=>{
                              changeRole(item._id,item.role);
                            }} className="hover:text-red-500"><i class="fa-solid fa-pencil"></i></button>  
                            )}
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
