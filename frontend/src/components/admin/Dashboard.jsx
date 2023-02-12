import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginSignup from '../User/LoginSignup';
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import { getAllOrders } from '../../actions/orderActions';
import { getAllUsers } from '../../actions/userActions';

const Dashboard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers())
    }, [dispatch])

    const { products } = useSelector(state => state.products);
    const { order } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers)

    let totalAmount = 0;
    order &&
        order.orders.forEach(item => {
            totalAmount += item.totalPrice
        })

    const { isAuthenticated, user } = useSelector(state => state.user);
    const role = user.data.user.role;

    return (
        <Fragment>
            {!(isAuthenticated && role === "admin") ? (
                <LoginSignup />
            ) : (
                <div className="dashboardContainer">
                    <h1 component="h1">Dashboard</h1>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br />
                                ₹{totalAmount.toFixed(2)}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>

                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{order && order.orders.length}</p>
                            </Link>

                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Dashboard
