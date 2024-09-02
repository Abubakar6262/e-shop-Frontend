// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import DashboardLoader from './components/Layout/DashboardLoader';

// const SellerProtectedRoute = ({ children }) => {
//     const { isLoading, isSellerAuthenticated, seller } = useSelector((state) => state.seller);
//     // console.log("is seller value in protection ", isSellerAuthenticated);
//     if (isLoading === false) {
//         if (!isSellerAuthenticated) {
//             return <Navigate to={`/`} replace />;
//         }
//         return children;
//     }
// };

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader'; 

const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSellerAuthenticated } = useSelector((state) => state.seller);

    if (isLoading) {
        return <Loader />; 
    }

    // If not authenticated, redirect to home
    if (!isSellerAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Render children if authenticated
    return children;
};

export default SellerProtectedRoute;
