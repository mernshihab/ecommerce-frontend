import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import axios from "axios";
import Helper from "../utility/Helper";

const OrderIcon = ({ onClick }) => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${Helper.API_BASE}/orders`);
      setTotalOrders(response.data.length);
    };

    fetchOrders();
  }, []);

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <FiPackage className="text-3xl text-white font-semibold" />
      {totalOrders > 0 && (
        <span className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalOrders}
        </span>
      )}
    </div>
  );
};

export default OrderIcon;
