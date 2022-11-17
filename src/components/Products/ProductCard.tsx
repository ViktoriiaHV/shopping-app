import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../Cart/+store/cartActions";
import { Product } from "./+store/productsReducer";

export const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart(product))
    }

  return (
        <Card sx={{ maxWidth: 200, width: 200 }}>
          <CardMedia
            component="img"
            height="140"
            width="100"
            image={product.imgUrl}
            alt="futbolka"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={addToCartHandler} size="small">Add to Cart</Button>
          </CardActions>
        </Card>
  );
};
