import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <>
            <div className='flex justify-center items-center h-screen'>
                <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
            </div>
        </>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/signIn' state={{ from: location }} replace />
};

export default PrivateRoute;