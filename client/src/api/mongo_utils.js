import axios from "axios";

export const getCart = async (userId) => {
  //   const body = { uid: userId };
  const options = {
    method: "GET",
    url: `http://localhost:3001/api/cart_items/${userId}`,
  };
  const data = await axios(options);
  if (data.data === null) {
    return [];
  }
  return data.data.cart;
};

export const putItemCart = async (userId, cartItem) => {
  const body = { uid: userId, cart: cartItem };
  const data = await axios.post(`http://localhost:3001/api/cart_items`, body);
};

export const deleteItemCart = async (userId, cartItem) => {
  const body = { uid: userId, cart: cartItem };
  const options = {
    method: "DELETE",
    url: `http://localhost:3001/api/cart_items`,
    data: body,
  };
  const data = await axios(options);
};

export const clearCart = async (userId) => {
  const options_clear = {
    method: "DELETE",
    url: `http://localhost:3001/api/empty_cart/${userId}`,
  };
  const data = await axios(options_clear);
  return data;
};

export const updateItemCart = async (userId, cartItem) => {
  const body = { uid: userId, cart: cartItem };
  const data = await axios.patch(`http://localhost:3001/api/cart_items`, body);
};

export const updateItemCartQuantity = async (userId, cartItem) => {
  const body = { uid: userId, cart: cartItem };
  const data = await axios.patch(
    `http://localhost:3001/api/cart_items/update_item`,
    body
  );
};
