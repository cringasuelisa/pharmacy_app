import React, { createContext, useState, useEffect } from "react";
import {
  getCart,
  putItemCart,
  deleteItemCart,
  updateItemCart,
  clearCart,
  updateItemCartQuantity,
} from "../api/mongo_utils"; // Adjust the path to where your mongoUtils file is located
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseApp from "../firebaseConfig";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const auth = getAuth(firebaseApp);

  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null); // Assuming you have a mechanism to set the userId

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (userId) {
      getCart(userId).then((data) => {
        setCartItems(data);
      });
    }
  }, [userId]);

  const addToCart = (item) => {
    putItemCart(userId, item).then(() => {
      getCart(userId).then((data) => {
        setCartItems(data);
      });
    });
  };

  const removeFromCart = (item) => {
    deleteItemCart(userId, item).then(() => {
      getCart(userId).then((data) => {
        setCartItems(data);
      });
    });
  };

  const updateCartItem = (itemId, newQuantity) => {
    let updatedCartItem = null;

    const newCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        updatedCartItem = { ...item, cantitate: newQuantity };
        return updatedCartItem;
      } else {
        return item;
      }
    });

    if (updatedCartItem) {
      updateItemCart(userId, updatedCartItem).then(() => {
        getCart(userId).then((data) => {
          setCartItems(data);
        });
      });
    }
  };
  const updateCartItemQuantity = (itemId, newQuantity) => {
    let updatedCartItem = null;

    const newCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        updatedCartItem = { ...item, cantitate: newQuantity };
        return updatedCartItem;
      } else {
        return item;
      }
    });
    console.log(newCartItems, "shoot");

    if (updatedCartItem) {
      updateItemCartQuantity(userId, updatedCartItem).then(() => {
        getCart(userId).then((data) => {
          setCartItems(data);
        });
      });
    }
  };

  const clearCartItems = () => {
    clearCart(userId).then(() => {
      getCart(userId).then((data) => {
        setCartItems(data);
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCartItems,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
