import React from "react";
import { AdminAllProducts, updateProduct } from "../../actions/productActions";
import { categories } from "../../constants/categories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function EditProduct({ product }) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(product.category);
  const [modalState, setModalState] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  async function updateHandler(){
    try {
      const newProduct = {
        name,
        stock : Number(stock),
        category,
        price,
        description,
      }
      const data = await updateProduct(product._id,newProduct);
      if(data.success){
        setModalState(false);
        toast.success(data.message, {theme:"dark", position:"bottom-right"});
        dispatch(AdminAllProducts());
      }
    } catch (error) {
      toast.error(error.response.data.message, {theme:"dark", position:"bottom-right"});
    }
  }

  return (
    <div>
      <ToastContainer />
      <button
        title="edit"
        onClick={() => setModalState(!modalState)}
        className="hover:text-cyan-500"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal isOpen={modalState} style={customStyles}>
        <div className="bg-gray-900 p-6 flex gap-8 flex-col justify-center -m-5 text-white">
          <label className="-mb-6 font-semibold">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            class="w-full -mb-8 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={name}
          />
          <label className="-mb-6 font-semibold">Stock</label>
          <input
            type="text"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            class="w-full bg-gray-800 -mb-8 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={stock}
          />

          <label className="-mb-6 font-semibold">Price</label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            class="w-full -mb-8 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={price}
          />
          <label for="name" className="-mb-6 font-semibold">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            id="name"
            name="name"
            class="w-full -mb-8 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:bg-gray-900 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          >
            {categories.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <label className="-mb-6 font-semibold">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            class="w-full -mb-4 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="50"
            rows="5"
            value={description}
          ></textarea>
          <div className="flex flex-row gap-2">
            <button
              className="w-1/2 p-1 bg-green-800 text-white hover:bg-green-600 duration-75 hover:scale-105 rounded-lg"
              onClick={updateHandler}
            >
              Update
            </button>
            <button
              className="w-1/2 p-1 bg-red-800 text-white rounded-lg  hover:bg-red-600 duration-75 hover:scale-105"
              onClick={() => setModalState(!modalState)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
