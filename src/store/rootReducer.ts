import { combineReducers } from "redux";
import { cartReducer } from "../components/Cart/+store/cartReducer";
import { productsReducer } from "../components/Products/+store/productsReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});
