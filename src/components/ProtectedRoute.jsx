import React from 'react'
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if(!userInfo){
        return <Navigate to="/SaveInfo.com/auth/login" replace/>;
    }

    return children;
}

export default ProtectedRoute;