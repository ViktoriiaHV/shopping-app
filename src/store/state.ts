import { CartState } from "../components/Cart/+store/cartReducer";
import { ProductsState } from "../components/Products/+store/productsReducer";

export interface State {
  products: ProductsState,
  cart: CartState
}