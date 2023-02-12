import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from "../../actions/cartActions";
import Rating from '@mui/material/Rating';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const ProductDetails = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const { products, loading, error } = useSelector(state => state.productDetails)

    const [quantity, setQuantity] = useState(1);
    const [cartToast, setCartToast] = useState(true)

    const increaseQuantity = () => {
        if ((products.stock) <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        const notify = () => toast("Item added to cart successfully");
        notify();
        setCartToast(true);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        dispatch(getProductDetails(id));       //same as backend "req.params.id" in fronend 
    }, [dispatch, id, error]);


    const options = {
        size: "large",
        value: products.ratings,
        readOnly: true,
        precision: 0.5
    }
    return (
        <Fragment>
            {loading ? <CircularProgress /> : (
                <Fragment>
                    {cartToast ? <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} /> : ""}
                    <div className="productDetails">
                        <Carousel>
                            {
                                products.images &&
                                products.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))
                            }
                        </Carousel>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{products.name}</h2>
                                <p>Product # {products._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>({products.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3" align="left">
                                <h1>{`₹${products.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button disabled={(products.stock < 1) ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status: {" "}
                                    <b className={(products.stock < 1) ? "redColor" : "greenColor"}>
                                        {(products.stock < 1) ? "Out Of Stock" : "Available"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{products.description}</p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails