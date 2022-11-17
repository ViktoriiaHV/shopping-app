import { Product } from "../../Products/+store/productsReducer";

export type CartActionType =
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "REMOVE_ITEM"
  | "EMPTY_CART";

const addToCart = (product: Product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

const removeFromCart = (product: Product) => ({
  type: "REMOVE_FROM_CART",
  payload: product,
});

const removeItem = (product: Product) => ({
  type: "REMOVE_ITEM",
  payload: product,
});

const emptyCart = () => ({
  type: "EMPTY_CART",
});

export const cartActions = {
  addToCart,
  removeFromCart,
  removeItem,
  emptyCart,
};
