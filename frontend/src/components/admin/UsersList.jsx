import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginSignup from '../User/LoginSignup';
import "./ProductList.css";
import { getAllUsers } from '../../actions/userActions';
import { CircularProgress } from '@mui/material';

const UsersList = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const role = user.data.user.role;
    const { users, loading } = useSelector(state => state.allUsers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    const column = [
        { field: "id", headerName: "User Id", minWidth: 200, flex: 1 },
        {
            field: "email",
            headerName: "E-mail ID",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.9,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 270,
            type: "number",
            flex: 0.3,
        }
    ]

    const row = [];

    users &&
        users.forEach(user => {
            row.push({
                id: user._id,
                role: user.role,
                email: user.email,
                name: user.name
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
                                <h1 id='productListHeading'>All Users</h1>

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
                                                    <td>{r.email}</td>
                                                    <td>{r.name}</td>
                                                    <td>{r.role}</td>
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

export default UsersList
