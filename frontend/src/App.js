import { useEffect } from 'react';
import './App.css';
import WebFont from 'webfontloader';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import LoginSignup from './components/User/LoginSignup';
import Profile from './components/User/Profile';
import Cart from './components/Cart/Cart';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import UsersList from './components/admin/UsersList';
import OrderList from './components/admin/OrderList';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Tiro Tamil", "Poppins"]
      }
    });
  }, []);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/confirm" element={<ConfirmOrder />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrder />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/products" element={<ProductList />} />
        <Route exact path="/admin/users" element={<UsersList />} />
        <Route exact path="/admin/orders" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
