import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import useUserRole from '../../../../Hooks/useUserRole';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSellerVerify from '../../../../Hooks/useSellerverify';
import greenTick from '../../../../assets/Icon/badge.png'

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [role] = useUserRole(user?.email);
    const [verified] = useSellerVerify(user?.email);

    // for scroll animation
    useEffect(() => {
        AOS.init();
    }, [])

    // For logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successful");
            })
            .catch((error) => {
                console.error(error.message);
                toast.error("Logout not successful")
            })
    }


    return (
        <div>
            <div className='h-screen flex justify-center items-center'>
                <div className="card card-compact max-w-96 bg-base-100 shadow-xl border border-blue-200 py-7" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-once="true" data-aos-duration="1000" >
                    {
                        verified ?
                            <div className="avatar flex justify-center">
                                <div className="w-40 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                                    
                                <div className='absolute w-1/12 right-24 bottom-32'>
                                    <img src={greenTick} alt="" />
                                </div>
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                            :
                            <div className="avatar flex justify-center">
                                <div className="w-40 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                    }
                    <div className="card-body">
                        <h2 className="text-2xl text-center font-bold">{user.displayName}</h2>
                        <h4 className='text-base'><span className='font-bold'>Email: </span> {user.email}</h4>
                        {
                            user.emailVerified ?
                                <h4 className='text-base'><span className='font-bold'>Email verified: </span>Yes</h4>
                                :
                                <h4 className='text-base'><span className='font-bold'>Email verified: </span>No</h4>

                        }
                        <h4 className='text-base'><span className='font-bold'>Role: </span>{role}</h4>
                        <h4 className='text-base'><span className='font-bold'>UID: </span>{user.uid}</h4>
                        <div className="card-actions justify-center">
                            <button onClick={handleLogout} className="btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 w-full mt-4">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;