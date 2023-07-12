import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    // For private route
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Sign in with email and password
    const handleSignIn = (data) => {
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    toast.success('Log In Successful');
                    reset();
                    navigate(from, {replace:true});
                }
            })
            .catch(error => {
                const errorMessage = error.message;
                setLoginError(errorMessage);
            })
        
    }

    // Sign in with google
    const google = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                if (user) {
                    toast.success("Login successful");
                    navigate(from, {replace:true});
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='h-auto flex justify-center items-center'>
            <div className='w-96 p-7 my-7 shadow-lg border border-white rounded-lg'>
                <h2 className='text-center text-4xl mt-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>SIGN IN</h2>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email Address is required." })} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required: "Password is required.",
                            maxLength: 20,
                            minLength: { value: 6, message: "Password must be at least 6 characters." }
                        })} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-sm mt-2 text-red-500'>{errors.password?.message}</p>}
                        <div>
                            {
                                loginError && <p className='text-red-500 mt-2'>{loginError}</p>
                            }
                        </div>
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    <input value='Sign In' className='btn w-full my-4 bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500' type="submit" />
                </form>
                <p className='text-sm text-center'>New to <span className='text-blue-500'>AAA</span> Technology? <Link className='text-blue-400' to='/signUP'>Sign Up</Link> </p>
                <div className="divider">OR</div>
                <button onClick={google} className='btn btn-outline w-full'><span className='text-blue-400 text-xl'><FaGoogle /></span>GOOGLE</button>
            </div>
        </div>
    );
};

export default SignIn;