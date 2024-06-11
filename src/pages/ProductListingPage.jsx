import React, { useState } from "react";
import ProductList from "../components/ProductList";
import OrderIcon from "../components/OrderIcon";
import CartIcon from "../components/CartIcon";
import CartModal from "../components/CartModal";
import OrderModal from "../components/OrderModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductListingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleCartIconClick = () => {
    setIsCartOpen(!isCartOpen);
    setIsOrderOpen(false);
  };

  const handleOrderIconClick = () => {
    setIsOrderOpen(!isOrderOpen);
    setIsCartOpen(false);
  };

  const handleCloseCartModal = () => {
    setIsCartOpen(false);
  };

  const handleCloseOrderModal = () => {
    setIsOrderOpen(false);
  };

  return (
    <div className="relative">
      <div className="fixed top-4 z-50 right-4 flex space-x-5 md:top-4 md:right-11">
        <CartIcon onClick={handleCartIconClick} />
        <OrderIcon onClick={handleOrderIconClick} />
      </div>
      <Navbar />
      <h1 className="font-bold text-2xl pt-24 ml-10">Product List</h1>
      <div className="flex flex-col md:flex-row">
        <div
          className={`w-full ${
            isCartOpen || isOrderOpen ? "md:w-2/3" : "md:w-full"
          } p-4`}
        >
          <ProductList isCartOpen={isCartOpen || isOrderOpen} />
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCloseCartModal} />
      <OrderModal isOpen={isOrderOpen} onClose={handleCloseOrderModal} />
      <Footer />
    </div>
  );
};

export default ProductListingPage;
