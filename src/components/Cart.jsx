import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex">
              <img
                className="w-24 h-24 rounded-md mr-2"
                src={item.product.image}
                alt="Product Image"
              />
              <div className="ml-2">
                <h3 className="text-lg font-bold">{item.product.title}</h3>
                <p className="text-gray-600">
                  ${item.product.price} x {item.quantity}
                </p>
                <button
                  title="Click to remove"
                  onClick={() => removeFromCart(item._id)}
                  className="py-1 text-red-500 font-semibold text-lg"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateCart(item._id, item.quantity - 1)}
                className="px-2 py-1 bg-red-500 font-bold text-white rounded duration-300 hover:bg-red-700"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateCart(item._id, item.quantity + 1)}
                className="px-2 py-1 bg-green-500 font-bold text-white rounded hover:bg-green-700 duration-300"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
      <div className="text-xl font-bold mb-4">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
