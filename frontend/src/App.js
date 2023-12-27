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


function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[])
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
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
