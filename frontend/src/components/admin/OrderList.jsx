import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginSignup from '../User/LoginSignup';
import "./ProductList.css";
import { getAllOrders } from '../../actions/orderActions';
import { CircularProgress } from '@mui/material';

const OrderList = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const role = user.data.user.role;
    const { order, loading } = useSelector(state => state.allOrders);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch])

    const column = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "itemQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "total",
            headerName: "Total Price",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "tax",
            headerName: "Tax",
            type: "number",
            minWidth: 270,
            flex: 0.7
        },
        {
            field: "discountedPrice",
            headerName: "Discounted Price",
            type: "number",
            minWidth: 270,
            flex: 0.7
        },
        {
            field: "coupon",
            headerName: "Coupon",
            type: "number",
            minWidth: 270,
            flex: 0.7
        },
    ]

    const row = [];

    order &&
        order.orders.forEach(item => {
            row.push({
                id: item._id,
                itemQty: item.orderItems.length,
                total: item.totalPrice,
                tax: item.taxPrice,
                discountedPrice: item.discountedPrice,
                coupon: item.coupon,
            })
        })
    // console.log(products);

    return (
        <Fragment>
            {!(isAuthenticated && role === "admin") ? (
                <LoginSignup />
            ) : (
                <Fragment>
                    {
                        loading ? <CircularProgress /> : (
                            <div className="productListContainer">
                                <h1 id='productListHeading'>All Orders</h1>

                                <table>
                                    <thead>
                                        {
                                            column.map((col, index) => (
                                                <th key={index}>{col.headerName}</th>
                                            ))
                                        }
                                    </thead>

                                    <tbody>
                                        {
                                            row.map((r, index) => (
                                                <tr key={index}>
                                                    <td>{r.id}</td>
                                                    <td>{r.itemQty}</td>
                                                    <td>{r.total}</td>
                                                    <td>{r.tax}</td>
                                                    <td>{r.discountedPrice}</td>
                                                    <td>{r.coupon}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderList
