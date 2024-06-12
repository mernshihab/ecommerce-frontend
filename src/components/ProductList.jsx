import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Helper from "../utility/Helper";

const ProductList = ({ isCartOpen }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${Helper.API_BASE}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);


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
