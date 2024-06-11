import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCart } = useContext(CartContext);

  if (!isOpen) return null;

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-stone-800 p-4 w-full sm:w-96 h-full shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-white">Shopping Cart</h2>
          <button onClick={onClose}>
            <FiX className="text-3xl text-white font-semibold" />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-white text-lg mb-5 ">
            Your cart is empty &#128546;
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="font-semibold text-white text-lg">
                  {item.product.title}
                </h3>
                <p className="text-white">
                  ${item.product.price} x {item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 font-semibold text-lg"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateCart(item._id, item.quantity - 1)}
                  className="px-2 py-1 font-semibold text-white duration-300 bg-red-600 rounded hover:bg-red-400"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2 text-base font-semibold text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCart(item._id, item.quantity + 1)}
                  className="px-2 py-1 font-semibold duration-300 text-white bg-green-600 rounded hover:bg-green-400"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
        <div className="text-xl font-semibold mb-4 text-white">
          Total: ${totalPrice.toFixed(2)}
        </div>
        {cart.length > 0 && (
          <Link
            to="/checkout"
            className="px-4 py-2 bg-green-500 text-white font-semibold tracking-wider rounded duration-300 hover:bg-green-700"
            onClick={onClose}
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartModal;
