import { Dispatch } from "redux";
import { Product } from "./productsReducer";
import {v4 as uuid}  from 'uuid'

export type ProducsActionType = "LOAD_PRODUCTS" | "PRODUCTS_LOADED";

const productsLoaded = (products: Product[]) => ({
  type: "PRODUCTS_LOADED",
  payload: products,
});

const loadProducts = () => async (dispatch) => {
  dispatch({
    type: "LOAD_PRODUCTS",
  });
  const products = await getProducts();
  dispatch(productsLoaded(products));
};

export const productsActions = {
  productsLoaded,
  loadProducts,
};

async function getProducts(): Promise<Product[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(new Array(25).fill(null).map((_, idx) => {
        return {
          id: uuid(),
          name: `name_${idx}`,
          price: (idx+1)**2,
          description: `Test description for ${idx}`,
          imgUrl: Boolean(Math.round(Math.random())) ? "https://img01.ztat.net/article/spp-media-p1/e00ead4b5a16452bab2ff74570acd310/067da0562098486bb2ba9078bd1fe0f4.jpg?imwidth=1800&filter=packshot" : "https://img01.ztat.net/article/spp-media-p1/c321cfa2a3ff457a9a474dc5865935fb/7186d4f3f8bf4baf94ef24fd01ac36ba.jpg?imwidth=1800&filter=packshot"
        }
      }));
    }, 2000);
  });
}
