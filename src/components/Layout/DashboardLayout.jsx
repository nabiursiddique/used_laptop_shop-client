import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useUserRole from '../../Hooks/useUserRole';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role] = useUserRole(user?.email);


    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">


                        <li><Link to='/dashboard/profile'>Profile</Link></li>
                        {
                            role === "Buyer" &&
                            <>
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                            </>
                        }
                        {
                            role === "Seller" &&
                            <>
                                <li><Link to='/dashboard/myProduct'>My Products</Link></li>
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                                <li><Link to='/dashboard/addAProduct'>Add a Product</Link></li>
                                <li><Link to='/dashboard/myBuyers'>My Buyers</Link></li>
                            </>
                        }
                        {
                            role === "Admin" &&
                            <>
                                <li><Link to='/dashboard/allUsers'>All Users</Link></li>
                                <li><Link to='/dashboard/allBuyers'>All Buyer</Link></li>
                                <li><Link to='/dashboard/allSellers'>All Seller</Link></li>
                                <li><Link to='/dashboard/blogPost'>Blog Post</Link></li>
                                <li><Link to='/dashboard/allBlogPosts'>All Blogs</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;