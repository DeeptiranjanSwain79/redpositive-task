import React, { Fragment, useState } from 'react';
import LoginSignup from '../User/LoginSignup';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css";
import { clearErrors, myOrders } from '../../actions/orderActions';
// import { Link } from '@mui/icons-material';
import { Launch } from '@mui/icons-material';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const MyOrder = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const { loading, error, order } = useSelector(state => state.myOrders);

    const dispatch = useDispatch();


    const columns = [
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
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.7
        },
        {
            field: "discount",
            headerName: "Discounted Amount",
            type: "number",
            minWidth: 270,
            flex: 1.2
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <a href={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch />
                    </a>
                );
            }
        }
    ]
    const rows = [];

    order &&
        order.orders.forEach((item, index) => {
            rows.push({
                itemQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
                discount: item.discountedPrice,
            })
        });
    const [notification, setNotification] = useState(false);
    useEffect(() => {
        if (error) {
            const notify = () => toast(error);
            dispatch(clearErrors);
            notify();
            setNotification(true);
        }
        dispatch(myOrders());
    }, [dispatch, error])

    return (
        <Fragment>
            {!isAuthenticated ? (
                <LoginSignup />
            ) : (
                <Fragment>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div className="myOrdersPage">
                            {notification ? <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} /> : ""}
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                // pageSize={10}
                                disableSelectionOnClick
                                className='myOrdersTable'
                                autoHeight
                            />
                            <h1 id="myOrdersHeading">{user.data.user.name}'s Orders</h1>
                        </div>
                    )}
                </Fragment>
            )}

        </Fragment>
    )
}

export default MyOrder