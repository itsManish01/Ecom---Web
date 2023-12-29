import React from "react"
import { useSelector } from "react-redux"
import Loading from "./Loading";
export default function OrderDetails() {
  const {orderDetails,loading} = useSelector(store=>store.order);
  return (
    <div>
      {loading ? (<Loading/>) :
      (<p> {orderDetails.totalPrice} </p>)
      }
    </div>
  )
}
