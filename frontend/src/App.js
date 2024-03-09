import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Products from "./components/Products.jsx";
import Search from "./components/Search.jsx";
import Signin from "./components/Signin.jsx"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {USER_LOAD_FAIL,  USER_LOAD_SUCCESS,  USER_LOAD_REQUEST,} from "./constants/userConstants.js"
import Profile from "./components/Profile.jsx"
import ForgotPassword from "./components/ForgotPassword.jsx";
import Cart from "./components/Cart.jsx"
import Shipping from "./components/Shipping.jsx"
import OrderSummary from "./components/OrderSummary.jsx"
import AllOrders from "./components/AllOrders.jsx"
import OrderDetails from "./components/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import Payment from "./components/Payment.jsx";
import AboutUs from "./components/AboutUs.jsx";
import ContactUs from "./components/ContactUs.jsx";
function App() {

  const dispatch = useDispatch();
  useEffect(()=>async()=>{
    try {
      dispatch({
        type: USER_LOAD_REQUEST
      });
      const {data}=await axios.get("/api/v1/me");
      dispatch({
        type : USER_LOAD_SUCCESS,
        payload : data.user,
      })
    } catch (error) {
      dispatch({
        type : USER_LOAD_FAIL,
      })
    }
  },[dispatch])
  return (
    <Router >
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<Signin/>}  />
          <Route path="/account" element={<Profile/>}  />
          <Route path="/cart" element={<Cart/>}  />
          <Route path="/password/reset/:token" element={<ForgotPassword/>}/>
          <Route path="/order/shipping" element={<Shipping />} />
          <Route path="/order/summary" element={<OrderSummary />} />
          <Route path="/order/paymentsuccess/:id" element={<Payment/>} />
          <Route path="/order/me" element={<AllOrders/>} />
          <Route path="/order/details/:id" element={<OrderDetails/>} />
          <Route path="/admin" element={<Dashboard/>} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
