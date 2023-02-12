import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import { Link, useNavigate } from 'react-router-dom';
import { MdRemoveShoppingCart } from "react-icons/md";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);

  const random = Math.floor(Math.random() * (99 - 10 + 1) + 10);
  const random1 = Math.floor(Math.random() * (9 - 1+ 1) + 1);
  const coupon = 'SHOP' + user.data.user.name.toUpperCase().slice(0, 2) + random1 + '0' + random;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty))
  }

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty))
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  }

  const checkoutHandler = () => {
    window.localStorage.setItem("coupon", coupon);
    navigate("/confirm");
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart />

          <h1>No products in your Cart</h1>
          <Link to="/">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                  <input type="number" readOnly value={item.quantity} />
                  <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                </div>

                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(    //reduce function implements a single function for all elements of the array
                  (total, item) => total + (item.quantity * item.price),
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Confirm Order</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
