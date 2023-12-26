import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getProduct } from "../actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"
import './CSS/pagination.css'

export default function Products() {
  const { loading, products, error ,productsCount } = useSelector(
    (store) => store.products
  );
  const [currentPage,setCurrentPage]  = useState(1);
  const {keyword} = useParams();
  const setCurrentPageNo =(e)=>{
    setCurrentPage(e);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(keyword,currentPage));
    if (error) {
      toast.error(error, { theme: "dark" });
    }
  }, [dispatch, error,keyword,currentPage]);


  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-4 mx-auto">
          <h1 class="text-3xl font-medium title-font text-white mb-12 text-center">
            Products
          </h1>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap -m-4">
            {loading ? (
              <Loading />
            ) : (
              <>
                {products &&
                  products.map((item) => {
                    return <ProductCard product={item} />;
                  })}
              </>
            )}
          </div>
        </div>
      </section>
      
      <section className="flex flex-row justify-center py-4">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={8}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
            >
            </Pagination>
      </section>

      <ToastContainer/>
    </>
  );
}
