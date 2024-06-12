import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Helper from "../utility/Helper";
import { TailSpin } from "react-loader-spinner";

const ProductList = ({ isCartOpen }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Helper.API_BASE}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex flex-col justify-center items-center w-full h-72">
        <p className="font-bold text-xl mb-1">Please wait or reload again</p>
        <TailSpin
          visible={true}
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div
      className={`grid ${
        isCartOpen
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      } gap-6 p-6 transition-all duration-300`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
