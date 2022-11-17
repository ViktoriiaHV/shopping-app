import { Action } from "redux";
import { Product } from "../../Products/+store/productsReducer";
import { CartActionType } from "./cartActions";

export interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  total: number;
  products: CartProduct[];
}

const initialState: CartState = {
  products: [{
    id:"id",
    name: "name",
    description: "description",
    price: 100,
    imgUrl: "imgUrl",
    quantity: 1,
    totalPrice: 100,
  }],
  total: 100,
};

export function cartReducer(
  state = initialState,
  action: Action<CartActionType> & { payload?: any }
): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((product) =>
            product === existingProduct
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  totalPrice: product.price * (product.quantity + 1),
                }
              : product
          ),
          total: state.total + action.payload.price,
        };
      }
      
      return {
        ...state,
        products: state.products.concat({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        }),
        total: state.total + action.payload.price,
      };
    }
    case "REMOVE_FROM_CART": {
      const id = action.payload.id;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (!existingProduct) return state;

      if (existingProduct.quantity === 1) {
        const filteredProducts = state.products.filter(
          (product) => product.id !== id
        );

        return {
          ...state,
          products: filteredProducts,
          total: state.total - existingProduct.price,
        };
      }

      return {
        ...state,
        products: state.products.map((product) =>
          product.id === existingProduct.id
            ? {
                ...product,
                quantity: existingProduct.quantity - 1,
                totalPrice: existingProduct.totalPrice - existingProduct.price,
              }
            : product
        ),

        total: state.total - existingProduct.price,
      };
    }

    case "REMOVE_ITEM":
      // find by ID in products, if no -> return
      // filter the products array by !== id
      const productId = action.payload.id; 
      const existingItem = state.products.find(product => product.id === productId);
      if (!existingItem) return state;
      const filteredProducts = state.products.filter(product => product.id !== productId);
      return {
        ...state,
        products: filteredProducts,
        total: state.total - existingItem.totalPrice
      }

    case "EMPTY_CART":
      return { ...initialState };
    default:
      return state;
  }
}
