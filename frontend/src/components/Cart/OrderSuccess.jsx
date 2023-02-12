import React from 'react';
import { MdCheckCircle } from "react-icons/md";
import "./OrderSuccess.css";
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
      <MdCheckCircle />
      <h1>Your Order has been placed successfully</h1>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
