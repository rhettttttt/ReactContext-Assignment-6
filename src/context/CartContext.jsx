// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (movie) => {
    setCartItems((prevItems) => {
      if (!prevItems.find((item) => item.id === movie.id)) {
        return [...prevItems, movie];
      }
      return prevItems;
    });
  };

  const removeFromCart = (movieId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== movieId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
