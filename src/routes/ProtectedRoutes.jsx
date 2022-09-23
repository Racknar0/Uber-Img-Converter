import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext'

const ProtectedRoutes = () => {

    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes