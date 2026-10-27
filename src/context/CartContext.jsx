import React, { createContext, useState } from "react";

// Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const addToCart = (product, quantity = 1) => {
    console.log("Adding Product:", product);
    setCartItems((prevItems) => {
      console.log("Previous Cart:", prevItems);
      const existingProduct = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity,
        },
      ];
    });

    // Toast Message
    setToastMessage(
      `🛒 ${product.name} ${
        quantity === 1 ? "item" : "items"
      } added to cart`
    );

    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, quantity),
            }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};