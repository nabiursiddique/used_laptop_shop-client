import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <div>
            <button className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500'>{children}</button>
        </div>
    );
};

export default PrimaryButton;