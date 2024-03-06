import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProduct from "./CreateProduct.jsx";
import AllProductsAdmin from "./AllProductsAdmin.jsx"
import MetaData from "../MetaData.js";
import Statistics from './Statistics.jsx'
import AllOrdersAdmin from "./AllOrdersAdmin.jsx";
import AllUserAdmin from "./AllUserAdmin.jsx";
export default function Dashboard() {
  const [option ,setOption] = useState(0);
  const { user, isAuth } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth || (isAuth && user.role !== "admin")) {
      navigate("/signin");
    }
  }, [isAuth, navigate, user.role]);
  return (
    <div>
      <MetaData title={"Ecom -ADMIN Dashboard"} />
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto flex flex-wrap">
          <div class="flex flex-col text-center w-full mb-10">
            <h2 class="text-xs text-yellow-400 tracking-widest font-medium title-font mb-1">
              ADMIN
            </h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
              Dashboard
            </h1>
          </div>

          <div className="flex sm:flex-row flex-col w-full justify-around ">
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Products
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(1)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===1 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i> All Products
                  </button>
                  <button onClick={()=>setOption(2)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===2 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-plus"></i> Create Product
                  </button>
                </div>
              </div>
            </div>
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Users
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(3)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===3 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i> All Users
                  </button>
                  <button onClick={()=>setOption(4)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===4 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-plus"></i> user
                  </button>
                </div>
              </div>
            </div>
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Order
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(5)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===5 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i> All Orders
                  </button>
                </div>
              </div>
            </div>
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Reviews
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(7)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===7 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i>All reviews
                  </button>
                  <button onClick={()=>setOption(8)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===8 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-plus"></i> Review
                  </button>
                </div>
              </div>
            </div>
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Statistics
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(9)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===7 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i> Total Statistics & Earnings
                  </button>
                </div>
              </div>
            </div>
          </div>

        <div className="w-full m-4 text-center">
          {option===0 && (<p className="text-3xl py-12">DashBoard</p>)}
          {option===1 && (<AllProductsAdmin />)}
          {option===2 && (<CreateProduct />)}
          {option===3 && (<AllUserAdmin />)}
          {option===5 && (<AllOrdersAdmin />)}
          {option===9 && (<Statistics />)}

        </div>


        </div>
      </section>
    </div>
  );
}
