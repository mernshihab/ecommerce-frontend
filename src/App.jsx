import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProductListingPage from "./pages/ProductListingPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
