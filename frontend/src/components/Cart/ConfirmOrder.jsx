import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./ConfirmOrder.css"
import LoginSignup from '../User/LoginSignup';
import { createOrder } from '../../actions/orderActions';


const ConfirmOrder = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const subtotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    const [applyCoupon, setApplyCoupon] = useState(false);


    let tax = subtotal * 0.1;

    const totalPrice = subtotal + tax;

    const coupon = window.localStorage.getItem("coupon");

    const discountedPrice = totalPrice * 0.8;

    const discounted = () => {
        if (input === coupon) setApplyCoupon(true);
    }
    const placeOrder = () => {
        const data = {
            orderItems: cartItems,
            itemsPrice: subtotal,
            coupon,
            taxPrice: tax,
            totalPrice,
            discountedPrice
        }
        dispatch(createOrder(data));
        navigate("/success");
    }

    return (
        <Fragment>
            {!isAuthenticated ? (
                <LoginSignup />
            ) : (
                <Fragment>
                    <div className="confirmOrderPage">
                        <div>
                            <div className="confirmCartItems">
                                <h1>Your Cart Items:</h1>
                                <div className="coupon">
                                    <p>Coupon:</p>
                                    <span>{coupon}</span>
                                </div>
                                <div className="applyCoupon">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value.toUpperCase())}
                                        placeholder='Enter Coupon here'
                                    />
                                    <button onClick={discounted} className='coupon-btn'>Apply</button>
                                </div>
                                <div className="confirmCartItemsContainer">
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                <span>
                                                    {item.quantity} X ₹{item.price} = {" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div>
                            <div className="orderSummary">
                                <h1>Order Summary</h1>
                                <div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div>
                                        <p>Tax:</p>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                        {
                                            applyCoupon ? <span>₹{discountedPrice.toFixed(2)}</span> : <span>₹{totalPrice.toFixed(2)}</span>
                                        }
                                    </p>
                                </div>

                                <button onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default ConfirmOrder
