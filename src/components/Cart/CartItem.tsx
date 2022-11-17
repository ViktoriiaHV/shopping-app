import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { cartActions } from "./+store/cartActions";
import "./CartItem.css";
import { useState } from "react";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isLastProduct, setIsLastProduct] = useState(false);

  const reduceQuantityHandler = () => {
    if(product.quantity <= 1) {
        setIsLastProduct(true);
        return;
    }
    dispatch(cartActions.removeFromCart(product));
  };

  const increaseQuantityHandler = () => {
    setIsLastProduct(false);
    dispatch(cartActions.addToCart(product));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItem(product));
  }
  
  return (
    <li>
      <div className="cart-item">
        <img src={product.imgUrl} alt="product_item" />
        <div className="cart-item-header">
          <h4>{product.name}</h4>
          <p>
            Total:&nbsp;
            <span className="cart-item-text-bold">{product.totalPrice}$</span>
          </p>
        </div>
      </div>
      <div className="cart-item-error-message">{isLastProduct && <p style={{color: 'red', }}>This is the last product in cart</p>}</div>
      <div className="cart-item-navigation">
        <div>
          <IconButton onClick={removeItemHandler}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
        <div className="cart-item-buttons">
          <IconButton
            size="large"
            sx={{ width: 35, height: 35, mr: 1 }}
            onClick={reduceQuantityHandler}
          >
            -
          </IconButton>
          <span>
            Quantity:{" "}
            <span className="cart-item-text-bold">{product.quantity}</span>
          </span>
          <IconButton
            sx={{ width: 35, height: 35, mr: 1 }}
            size="large"
            disabled={product.quantity >= 5}
            onClick={increaseQuantityHandler}
          >
            +
          </IconButton>
        </div>
      </div>
    </li>
  );
};
