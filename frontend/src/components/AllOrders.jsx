import React, { useEffect , useState} from "react";
import { useNavigate , Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
export default function AllOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.user);
  const [orders,setOrders] = useState(null);
  useEffect(
    () => async () => {
      if (isAuth) {
        try {
          const { data } = await axios.get("/api/v1/orders/me");
          setOrders(data.orders);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Login First");
        navigate("/signin");
      }
    },
    [isAuth, navigate, dispatch]
  );

  return (
    <div className="sm:w-2/3 sm:pl-8 sm:py-4 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left flex flex-col gap-8">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-500">
        My orders
      </h1>

      <div>
        {orders===null ? (
          <Loading />
        ) : ( 
          <>
          {orders.map((order)=>{
            return (
            <div class="p-2 w-full">
              <div class="h-full bg-gray-800 bg-opacity-40 p-4 rounded">
                {order.orderStatus==="Processing" && (<span className="text-blue-500 font-bold rounded-sm"> {order.orderStatus}</span>) } 
                {order.orderStatus==="Delivered" && (<span className="text-green-500 font-bold rounded-sm"> {order.orderStatus}</span>) } 
                {order.orderStatus==="Shipped" && (<span className="text-yellow-500 font-bold rounded-sm"> {order.orderStatus}</span>) } 
                {order.orderStatus==="Cancelled" && (<span className="text-red-500 font-bold rounded-sm"> {order.orderStatus}</span>) } 
                <p class="leading-relaxed mb-6">
                  <ul>
                    {order.orderItems.map((item)=>{
                      return (
                        <li> {item.product.name} </li>
                      )
                    })}
                  </ul>
                </p>
                <Link to={`/order/details/${order._id}`} class="inline-flex items-center text-yellow-500"> See Details  </Link>
                <p> Ordered At : {order.createdAt.split('T')[0]}</p>
              </div>
            </div>
            )
          })}
          </>
        )
        }
      </div>
      <ToastContainer />
    </div>
  );
}
