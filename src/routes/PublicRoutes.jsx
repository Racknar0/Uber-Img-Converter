import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext'

const PublicRoutes = () => {

    const { isAuthenticated } = useContext(AuthContext);
    console.log('isAuthenticated', isAuthenticated);

    /* si esta autenticado no poder entrar al login */
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    } else {
        return (
            <Outlet />
        )
    }
}

export default PublicRoutes