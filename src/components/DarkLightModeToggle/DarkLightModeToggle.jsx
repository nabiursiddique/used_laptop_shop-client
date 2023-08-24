import React, { useEffect, useState } from 'react';

import { BsSun } from "react-icons/bs";
import { GoMoon } from "react-icons/go";

const DarkLightModeToggle = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') || 'dracula' : "dracula");

    const toggle = () => {
        if (mode === 'dracula') {
            setMode('lemonade');
        } else {
            setMode('dracula');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', mode);
        document.querySelector('html').setAttribute('data-theme', mode);
    }, [mode])
    return (
        <div className='flex lg:mr-5 mr-3 justify-center items-center' onClick={toggle}>
            {
                mode === 'dracula' ?
                    <button><BsSun className='text-2xl' /></button>
                    :
                    <button><GoMoon className='text-2xl' /></button>
            }
        </div>
    );
};

export default DarkLightModeToggle;