import { State } from "../../../store/state";

export const productsSelectors = {
    selectProducts: (state: State) => state.products.products,
    selectIsLoading: (state: State) => state.products.isLoading,
}
