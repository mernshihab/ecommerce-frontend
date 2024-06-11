import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const CartIcon = ({ onClick }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative" onClick={onClick}>
      <FiShoppingCart className="text-3xl text-white font-semibold" />
      {totalItems > 0 && (
        <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
