import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Cart />
        <CheckoutForm />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
