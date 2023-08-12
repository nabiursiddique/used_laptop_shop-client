import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import men from '../../../assets/Avatar/Men.png';
import { FaEllipsis } from "react-icons/fa6";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "lemonade");
  const { user, logOut } = useContext(AuthContext);

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

  // Function for toggle dark and light theme
  const toggleTheme = (event) => {
    const toggler = event.target.checked;

    if (toggler && theme === 'lemonade') {
      setTheme('dracula');
    }
    else {
      setTheme('lemonade');
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme])


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
        <label onClick={toggleTheme} className="swap swap-rotate mx-4 ">
          <input type="checkbox" />
          <svg className="swap-on fill-current w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          {/* moon icon */}
          <svg className="swap-off fill-current w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>
        <label title='Open Drawer' htmlFor="my-drawer-2" className="drawer-button lg:hidden mr-2 bg-slate-600 text-white rounded-full p-2"><FaEllipsis /></label>
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
    </div>
  );
};

export default Navbar;