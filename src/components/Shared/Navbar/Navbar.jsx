import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import men from '../../../assets/Avatar/Men.png';
import { FaEllipsis } from "react-icons/fa6";
import DarkLightModeToggle from '../../DarkLightModeToggle/DarkLightModeToggle';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const pathname = location.pathname;
  const dashboardPath = pathname.split('/')[1];

  // For logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Logout not successful")
      })
  }

  // For menu
  const menu = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/products'>Products</Link></li>
    <li><Link to='/blog'>Blog</Link></li>
    {
      user?.uid ?
        <>
          <li><Link to='/dashboard/profile'>Dashboard</Link></li>
          <li onClick={handleLogOut}><a href="">Sign Out</a></li>
          <li><Link to='/dashboard/profile'><p className='font-bold'>{user.displayName}</p></Link></li>
        </>
        :
        <li><Link to='/signIn'>Sign In</Link></li>
    }

  </>

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
            {menu}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case lg:text-2xl md:text-xl sm:text-xs bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text font-bold">AAA TECNOLOGY</Link>
      </div>

      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {menu}
        </ul>
      </div>
      <div className='navbar-end'>
        <DarkLightModeToggle />
        {
          dashboardPath === 'dashboard' ?
            <label title='Open Drawer' htmlFor="my-drawer-2" className="drawer-button lg:hidden mr-2 bg-slate-600 text-white rounded-full p-2"><FaEllipsis /></label>
            :
            <></>
        }
        {
          user?.uid &&
          <>
            <div className="avatar">
              <div className="w-9 rounded-full">
                <Link to='/dashboard/profile'>
                  {
                    user?.photoURL ?
                      <img title={user.displayName} src={user.photoURL} alt="Tailwind-CSS-Avatar-component" />
                      :
                      <img title={user.displayName} src={men} alt="Tailwind-CSS-Avatar-component" />
                  }
                </Link>
              </div>
            </div>
          </>
        }


      </div>
    </div >
  );
};

export default Navbar;