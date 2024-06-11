import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import Helper from "../utility/Helper";

const initialState = {
  cart: [],
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "REMOVE_All_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const response = await axios.get(`${Helper.API_BASE}/cart`);
    dispatch({ type: "SET_CART", payload: response.data });
  };

  const addToCart = async (productId, quantity) => {
    const existingItem = state.cart.find(
      (item) => item.product._id === productId
    );

    if (existingItem) {
      const response = await axios.patch(
        `${Helper.API_BASE}/cart/${existingItem._id}`,
        { quantity: existingItem.quantity + quantity }
      );
      dispatch({ type: "UPDATE_CART", payload: response.data });
    } else {
      const response = await axios.post(`${Helper.API_BASE}/cart`, {
        productId,
        quantity,
      });
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    }
  };

  const removeFromCart = async (id) => {
    await axios.delete(`${Helper.API_BASE}/cart/${id}`);
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  const removeAllCart = async (id) => {
    await axios.delete(`${Helper.API_BASE}/cart/`);
    dispatch({ type: "REMOVE_All_CART" });
  };

  const updateCart = async (id, quantity) => {
    const response = await axios.patch(`${Helper.API_BASE}/cart/${id}`, {
      quantity,
    });
    dispatch({ type: "UPDATE_CART", payload: response.data });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateCart,
        removeAllCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
