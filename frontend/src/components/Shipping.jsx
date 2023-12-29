import React, { useState } from "react";
import MetaData from "./MetaData";
import { shippingAdd } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {shippingInfo} = useSelector(store=>store.cart);
  const [shipdetails, setShippingInfo] = useState(shippingInfo);
  const handler = (e) => {
    setShippingInfo({
      ...shipdetails,
      [e.target.name]: e.target.value,
    });
  };
  const paymentHandler = () => {
    shipdetails.state = State.getStateByCodeAndCountry(shipdetails.state,shipdetails.country).name;
    shipdetails.country = Country.getCountryByCode(shipdetails.country).name;
    if(!shipdetails.address || !shipdetails.country || !shipdetails.state || !shipdetails.city || !shipdetails.phoneNo || !shipdetails.pincode){
      toast.error("Please fill all the details", {theme:"dark", position:"bottom-right"})
      return ;
    }
    dispatch(shippingAdd(shipdetails));
    navigate("/order/summary");
  };
  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <MetaData title={"Ecom - shipdetails"} />
      <progress className="w-full h-1" value={0.25} />
      <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full mb-4">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
            Shipping Info
          </h1>
        </div>
        <div class="flex gap-8 lg:w-1/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Address</label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              value={shipdetails.address}
              type="text"
              name="address"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Country</label>
            <select
              value={shipdetails.country}
              onChange={(e) => {
                handler(e);
              }}
              name="country"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
              {Country.getAllCountries().map((item) => {
                return (
                  <option className="bg-slate-700" value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">State</label>
            <select
              onChange={(e) => {
                handler(e);
              }}
              value={shipdetails.state}
              name="state"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
              {State.getStatesOfCountry(shipdetails.country).map((item) => {
                return (
                  <option className="bg-slate-700" value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">City</label>
            <select
              onChange={(e) => {
                handler(e);
              }}
              value={shipdetails.city}
              name="city"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
              {City.getCitiesOfState(shipdetails.country,shipdetails.state).map((item) => {
                return (
                  <option className="bg-slate-700" value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Pincode</label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              value={shipdetails.pincode}
              type="text"
              name="pincode"
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label class="leading-7 text-sm text-gray-400">Phone Number</label>
            <input
              onChange={(e) => {
                handler(e);
              }}
              type="text"
              name="phoneNo"
              value={shipdetails.phoneNo}
              class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={paymentHandler}
            class="text-white  bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Procced to Payment
          </button>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}
