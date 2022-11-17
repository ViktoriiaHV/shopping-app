import { Action } from "redux";
import { ProducsActionType } from "./productsAction";

export interface Product {
    id: string, 
    name: string,
    price: number,
    description: string
    imgUrl: string
}


export interface ProductsState {
  products: Product[];
  isLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  isLoading: true,
};

export function productsReducer(
  state = initialState,
  action: Action<ProducsActionType> & { payload: any }
): ProductsState {
  switch (action.type) {
    case "PRODUCTS_LOADED":
      return { ...state, products: action.payload, isLoading: false };

    default:
      return state;
  }
}
