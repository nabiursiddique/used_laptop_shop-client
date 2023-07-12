import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../../components/LittleComponents/LoadingAnimation/LoadingAnimation';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/signIn' state={{ from: location }} replace />
};

export default PrivateRoute;