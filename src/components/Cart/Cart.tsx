import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelectors } from "./+store/cartSelectors";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";

import "./Cart.css";
import { cartActions } from "./+store/cartActions";

export const Cart = () => {
const dispatch = useDispatch();
  const cartContent = useSelector(cartSelectors.selectCart);
  const cartTotal = useSelector(cartSelectors.selectTotal);
  const cartItemsAmount = cartContent.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );

  const emptyCartHandler = () => {
    dispatch(cartActions.emptyCart());
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h2>
          Your basket has {cartItemsAmount}{" "}
          {cartItemsAmount === 1 ? "item" : "items"}
        </h2>
        <div className="cart-header-button">
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/products"
          >
            Close Cart
          </Button>
        </div>
      </div>
      <div className="cart-items-wrapper">
        <div className="cart-items-list">
          <ul>
            {cartContent.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </ul>
        </div>
        <div className="cart-summary">
          <div className="cart-summary-content">
            <h4>Your Total Value is {cartTotal}$</h4>
            <p>Amount tax is {(cartTotal * 0.025).toFixed(2)}$</p>
            <div className="cart-summary-buttons">
              <Button
                variant="contained"
                color="success"
                disabled={!cartItemsAmount}
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                color="inherit"
                disabled={!cartItemsAmount}
                onClick={emptyCartHandler}
              >
                Empty Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
