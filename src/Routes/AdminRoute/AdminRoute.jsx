import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../../components/LittleComponents/LoadingAnimation/LoadingAnimation';
import useUserRole from '../../Hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role,isLoadingRole] = useUserRole(user?.email);
    const location = useLocation();

    if (loading || isLoadingRole) {
        return <LoadingAnimation></LoadingAnimation>
    }

    if (user && role === "Admin") {
        return children;
    }
    return <Navigate to='/signIn' state={{ from: location }} replace />
};

export default AdminRoute;