import React, { Fragment, useEffect, useState } from 'react';
import LoginSignup from '../User/LoginSignup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import { CircularProgress } from '@mui/material';
import "./OrderDetails.css";
import { ToastContainer, toast } from 'react-toastify';

const OrderDetails = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const { order, error, loading } = useSelector(state => state.orderDetails);

    const dispatch = useDispatch();

    const { id } = useParams();
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (error) {
            const notify = () => toast(error);
            notify();
            dispatch(clearErrors);
            setNotification(true);
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error, id])

    return (
        <Fragment>
            {!isAuthenticated ? (
                <LoginSignup />
            ) : (
                <Fragment>
                    {loading ? <CircularProgress /> : <Fragment>
                        <div className="orderDetailsPage">
                            <div className="orderDetailsContainer">
                                <h1 component="h1">Order #{order && order._id}</h1>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                </div>
                                <h1>Payment</h1>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Total Amount:</p>
                                        <span>₹{order.totalPrice && order.totalPrice}</span>
                                    </div>
                                    <div>
                                        <p>Discounted Amount:</p>
                                        <span>₹{order.discountedPrice && order.discountedPrice}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="orderDetailsCartItems">
                                <h1>Order Items:</h1>
                                <div className="orderDetailsCartItemsContainer">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} = {" "} <b>₹{item.quantity * item.price}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {notification ? <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} /> : ""}
                    </Fragment>}
                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetails
