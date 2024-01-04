import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProduct from "./CreateProduct.jsx";
import AllProductsAdmin from "./AllProductsAdmin.jsx"
import MetaData from "../MetaData.js";
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
            <div className="flex sm:flex-row justify-center flex-col">
              <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i class="fa-solid fa-user text-3xl text-yellow-500"></i>
                  <h2 class="title-font font-medium text-3xl text-white">4</h2>
                  <p class="leading-relaxed">Users</p>
                </div>
              </div>
              <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i class="fa-solid fa-bag-shopping text-3xl text-yellow-500"></i>
                  <h2 class="title-font font-medium text-3xl text-white">
                    556
                  </h2>
                  <p class="leading-relaxed">Products</p>
                </div>
              </div>
              <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i class="fa-regular fa-folder-open text-3xl text-yellow-500"></i>
                  <h2 class="title-font font-medium text-3xl text-white">14</h2>
                  <p class="leading-relaxed">Orders</p>
                </div>
              </div>
              <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <i class="fa-solid fa-hand-holding-dollar text-3xl text-yellow-500"></i>
                  <h2 class="title-font font-medium text-3xl text-white">
                    1.3K
                  </h2>
                  <p class="leading-relaxed">Total Earning</p>
                </div>
              </div>
              <div class="p-4 md:w-1/4 sm:w-1/2 w-full ">
                <Link to="/admin/statistics">
                  <div class="border-2 border-gray-800 bg-gray-600 px-4 py-6 rounded-lg">
                    <i class="fa-solid fa-up-right-from-square text-3xl text-yellow-500"></i>
                    <h2 class="title-font font-medium text-3xl text-white">
                      Go to
                    </h2>
                    <p class="leading-relaxed">Statistics</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col w-full justify-around ">
            <div className="w-auto sm:flex-row flex-col">
              <div className="sm:text-xl text-lg font-medium title-font text-white m-3">
                Products
                <div className="flex sm:flex-row w-full text-sm gap-1">
                  <button onClick={()=>setOption(1)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===1 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-check-double"></i> Product Details
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
                  <button onClick={()=>setOption(6)} className={`hover:bg-yellow-500 p-1 rounded-md ${option===6 ? "bg-yellow-500" : "bg-gray-500"}`}>
                    <i className="fa-solid fa-plus"></i> Order
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
          </div>

        <div className="w-full m-4 text-center">
          {option===0 && (<p className="text-3xl py-12">DashBoard</p>)}
          {option===1 && (<AllProductsAdmin />)}
          {option===2 && (<CreateProduct />)}

        </div>


        </div>
      </section>
    </div>
  );
}
