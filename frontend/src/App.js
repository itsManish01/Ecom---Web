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
import { loadUser } from "./actions/userActions.js";
import Profile from "./components/Profile.jsx"
import ForgotPassword from "./components/ForgotPassword.jsx";
import Cart from "./components/Cart.jsx"
import Shipping from "./components/Shipping.jsx"
import Payment from "./components/Payment.jsx";
import OrderSummary from "./components/OrderSummary.jsx"
import OrderDetails from './components/OrderDetails'
function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])
  return (
    <Router >
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<Signin/>}  />
          <Route path="/account" element={<Profile/>}  />
          <Route path="/cart" element={<Cart/>}  />
          <Route path="/password/reset/:token" element={<ForgotPassword/>}/>
          <Route path="/order/shipping" element={<Shipping />} />
          <Route path="/order/summary" element={<OrderSummary />} />
          <Route path="/order/payment" element={<Payment/>} />
          <Route path="/order/details" element={<OrderDetails/>} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
