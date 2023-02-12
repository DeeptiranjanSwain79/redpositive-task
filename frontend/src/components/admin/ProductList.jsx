import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginSignup from '../User/LoginSignup';
import "./ProductList.css";
import { getProduct } from "../../actions/productActions";
import { CircularProgress } from '@mui/material';

const ProductList = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const role = user.data.user.role;
    const { products, loading } = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])

    const column = [
        { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        }
    ]

    const row = [];

    products &&
        products.forEach(item => {
            row.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name
            })
        })
    // console.log(column);

    return (
        <Fragment>
            {!(isAuthenticated && role === "admin") ? (
                <LoginSignup />
            ) : (
                <Fragment>
                    {
                        loading ? <CircularProgress /> : (
                            <div className="dashboard">
                                <div className="productListContainer">
                                    <h1 id='productListHeading'>All Products</h1>

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
                                                        <td>{r.name}</td>
                                                        <td>{r.stock}</td>
                                                        <td>{r.price}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductList
