import React from 'react';

const LoadingAnimation = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
    );
};

export default LoadingAnimation;