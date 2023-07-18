import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/signIn');
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='flex items-center justify-center h-screen bg-base-100'>
            <div className='text-center'>
                <h1 className='animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear text-5xl uppercase font-bold  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'>404</h1>
                <h1 className='animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear text-5xl uppercase font-bold  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'>Sorry</h1>
                <h1 className='text-4xl uppercase font-bold animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'> You are in wrong page</h1>
                <h2 className="text-4xl text-center font-bold mb-4 animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear  bg-gradient-to-r from-blue-600  to-blue-400 text-transparent bg-clip-text">Please Go Back Or</h2>
                <button className='btn btn-sm btn-outline animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ErrorPage;