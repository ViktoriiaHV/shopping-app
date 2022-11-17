import { State } from "../../../store/state";

export const cartSelectors = {
    selectCart: (state: State) => state.cart.products,
    selectTotal: (state: State) => state.cart.total,
}
