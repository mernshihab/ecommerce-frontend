import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-72  shadow-sm object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product._id, 1)}
        className="glow-on-hover"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
