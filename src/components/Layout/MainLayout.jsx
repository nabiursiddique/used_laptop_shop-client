import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;