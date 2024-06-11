import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutForm = () => {
  const { cart, removeAllCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const notify = () => toast.success("Your Oder Has Been Placed.");

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    else if (!/^\d{11}$/.test(formData.phone))
      formErrors.phone = "Phone number is invalid";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      items: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
      shippingDetails: formData,
    };

    try {
      await axios.post(`${Helper.API_BASE}/orders`, order);
      setFormData({ name: "", address: "", phone: "" });
      notify();
      setTimeout(() => {
        removeAllCart();
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input
            type="text"
            placeholder="Your Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            placeholder="Your Contact Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 duration-300 text-white rounded hover:bg-blue-700"
        >
          Place Order
        </button>
        <Link
          to="/"
          className="px-4 py-2 ml-2 md:ml-3 bg-red-500 duration-300 text-white rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </form>
    </>
  );
};

export default CheckoutForm;
