import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword.jsx"
import MetaData from "./MetaData.js";
import AllOrders from "./AllOrders.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const { isAuth, user, loading } = useSelector((store) => store.user);
  const [option,setOption] = useState(1);
  useEffect(() => {
    if (!isAuth ) {
      navigate("/signin");
    }
  }, [isAuth,navigate]);

  return (
    <div>
      <MetaData title={"Ecom - User account"}/>
      <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-4 mx-auto flex flex-col">
        {loading ? (
          <Loading />
        ) : (
          <>
              <div className="lg:w-4/6 mx-auto">
                <div className="flex flex-col sm:flex-row mt-10">
                  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    {   (user.avatar && user.avatar.url) ?
                        (
                            <img
                              className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"
                              src={user.avatar.url}
                              alt="pic"
                            ></img>

                        ) : (<Loading/>)
                    }
                    <div className="flex flex-col items-center text-center justify-center">
                      <h2 className="font-medium title-font mt-4 text-white text-lg">
                        {user.name}
                      </h2>
                      <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4">
                      </div>
                        Joined On : {user.createdAt && ( user.createdAt.split('T')[0])}
                       <button 
                       onClick={()=>setOption(1)}
                       className="text-lg p-2 hover:scale-110 duration-150 rounded-t-lg text-white bg-gray-700 mt-8  w-full  hover:bg-yellow-500"
                       >
                          Update Credentials
                       </button>
                       <button 
                           onClick={()=>setOption(2)}
                           className="text-lg p-2 hover:scale-110 duration-150  text-white  bg-gray-700 hover:bg-yellow-500 w-full"
                           >
                          My Orders
                       </button>
                       <button 
                           onClick={()=>setOption(3)}
                       className="text-lg p-2 hover:scale-110 duration-150 rounded-b-lg  text-white bg-gray-700 hover:bg-yellow-500 w-full"
                       >
                          Change Password
                       </button>
                    </div>
                  </div>
                  {option===1 && (<UpdateProfile/>)}
                  {option===2 && (<AllOrders/>)}
                  {option===3 && (<ChangePassword/>)}
                </div>
              </div>
          </>
        )}
        </div>
      </section>
    </div>
  );
}
