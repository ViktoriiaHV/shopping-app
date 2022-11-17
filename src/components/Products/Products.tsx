import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "./+store/productsAction";
import { productsSelectors } from "./+store/productsSelectors";
import { ProductCard } from "./ProductCard";

import "./Products.css";

export const Products = (): JSX.Element => {
  const products = useSelector(productsSelectors.selectProducts);
  const isLoading = useSelector(productsSelectors.selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.loadProducts() as any);
  }, [dispatch]);

  return (
    <div className="product-list-container">
      {isLoading ? (
        <CircularProgress size="60px" />
      ) : (
        <div style={{ padding: '1rem 2rem', }}>
          <Grid container rowGap="1rem" columnGap="1rem" alignItems="center">
            {products.map((product) => (
              <Grid key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};
