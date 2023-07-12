import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (user) {
        return children;
    }
    return <Navigate to='/signIn' state={{from:location}} replace/>
};

export default PrivateRoute;