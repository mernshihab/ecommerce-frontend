import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import Helper from "../utility/Helper";

const OrderModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${Helper.API_BASE}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`${Helper.API_BASE}/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      <div className="bg-white p-4 w-full sm:w-96 h-full shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Order Invoice</h2>
          <button onClick={onClose}>
            <FiX className="text-2xl" />
          </button>
        </div>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-4 p-4 border rounded">
              <div>
                <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                {order.items.map((item, index) => (
                  <div
                    key={item.product._id}
                    className="mb-2 p-2 border rounded"
                  >
                    <p>
                      <strong>Item {index + 1}</strong>
                    </p>
                    <p>
                      <strong>Product Name:</strong> {item.product.title}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.product.price}
                    </p>
                  </div>
                ))}
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice}
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingDetails.address}
                </p>
                <p>
                  <strong>Phone Number:</strong> {order.shippingDetails.phone}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded duration-300 hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderModal;
