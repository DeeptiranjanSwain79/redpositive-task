import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./Profile.css"
import LoginSignUp from './LoginSignup';
import { CircularProgress } from '@mui/material';
import userImage from "../../images/user.png";
import { logout } from '../../actions/userActions';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated])
    const Logout = () => {
        dispatch(logout());
        navigate('/login');
    }
    return (
        <Fragment>
            {loading ?
                (<CircularProgress />)
                : (

                    [!isAuthenticated ?
                        (<LoginSignUp />) :
                        (
                            <Fragment>
                                <div className="profileContainer">
                                    <div>
                                        <h1>My Profile</h1>
                                        <img src={userImage} alt={user.data.user.name} />
                                        {
                                            user.data.user.role === "admin" &&
                                            <Link to="/dashboard">Admin Dashboard</Link> 
                                        }
                                        <Link to="/">Home</Link> 
                                        <button className='logout-btn' onClick={Logout}>Logout</button>
                                    </div>
                                    <div>
                                        <div>
                                            <h4>Full Name</h4>
                                            <p>{user.data.user.name}</p>
                                        </div>
                                        <div>
                                            <h4>Email</h4>
                                            <p>{user.data.user.email}</p>
                                        </div>
                                        <div>
                                            <h4>Joined on</h4>
                                            <p>{String(user.data.user.createdAt).substr(0, 10)}</p>
                                        </div>

                                        <div>
                                            <Link to="/orders">My Orders</Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    ]
                )}
        </Fragment>
    )
}

export default Profile
