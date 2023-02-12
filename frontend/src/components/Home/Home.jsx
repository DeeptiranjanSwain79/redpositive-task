import React, { Fragment, useEffect, useState } from 'react';
import "./Home.css";
import { getProduct, clearErrors } from '../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import store from "../../store";
import { loadUser } from '../../actions/userActions';

const Home = () => {
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(
        (state) => state.products
    );
    const { isAuthenticated } = useSelector(state => state.user);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (error) {
            const notify = () => toast(error);
            notify();
            dispatch(clearErrors);
            setNotification(true);
        }
        dispatch(getProduct());
        store.dispatch(loadUser());
    }, [dispatch, error]);

    return (
        <>
            {
                loading ? (
                    <CircularProgress />
                ) : (
                    <Fragment>
                        {
                            isAuthenticated ? (
                                <div className="auth-links">
                                    <Link to="/cart">My Cart</Link>
                                    <Link to="/account">My Profile</Link>
                                </div>
                            ) : (
                                <div className="link-holder">
                                    <Link to="/login" className='link'>Login</Link>
                                </div>
                            )
                        }

                        <div className="container">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                        {notification ? <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} /> : ""}
                    </Fragment>
                )
            }
        </>
    )
}

export default Home