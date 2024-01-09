import React, { useState } from "react";
import Loading from "../Loading";
import { categories } from "../../constants/categories";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct } from "../../actions/productActions";
export default function CreateProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images,setImages] = useState([]);
  const [process,setProcess] = useState(false);

  const changeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach(element => {
      const reader  = new FileReader();
      reader.onload=()=>{
        if(reader.readyState === 2){
          setImages((old)=>[...old,reader.result]);
        }
      }
      reader.readAsDataURL(element);
    });
  };

  const submitHander = async() => {
    if (category === "All") {
      toast.error("Category can't be All, please select one!", {theme:"dark", position:"bottom-right"});
      return;
    }
    try {
      setProcess(!process);
      toast("Please wait",{theme: "dark", position :"bottom-right"});
      const product = {
        name,
        stock : Number(stock),
        category,
        price,
        description : desc,
        images
      }
      const data = await createProduct(product);
      setProcess(false);
      if(data.success){
        toast.success(data.message, {theme:"dark", position:"bottom-right"});      
      }
      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      setDesc("");
      setImages([]);
    } catch (error) {
      setProcess(false);
      toast.error(error.response.data.message, {theme:"dark" , position: "bottom-right"});
    }
  };

  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
              Create a Product
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-col flex-wrap -m-2">
              <div className="flex flex-row">
                <div class="p-2 w-2/3">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-400">
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      id="name"
                      name="name"
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-1/3">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-400">
                      Category
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      type="text"
                      id="name"
                      name="name"
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      {categories.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row">
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label class="leading-7 text-sm text-gray-400">Price</label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="text"
                      name="price"
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label class="leading-7 text-sm text-gray-400">
                      Stocks
                    </label>
                    <input
                      type="text"
                      name="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label class="leading-7 text-sm text-gray-400">
                    Description
                  </label>
                  <textarea
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="relative">
                  <label class="leading-7 text-sm text-gray-400 mr-5">
                    Images
                  </label>
                <input type="file"  onChange={changeImages} multiple></input>
              </div>
              <div class="p-2 w-full">
                {process ? (<Loading/>) : (

                  <button  
                  onClick={submitHander}
                  class="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                  >
                  Create
                </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </div>
  );
}
