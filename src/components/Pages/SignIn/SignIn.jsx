import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const handleSignIn =(data)=>{
        console.log(data);
    }
    return (
        <div className='h-auto flex justify-center items-center'>
            <div className='w-96 p-7 my-7 shadow-lg border border-white rounded-lg'>
                <h2 className='text-center text-4xl mt-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>SIGN IN</h2>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email")} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password")} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    <input value='Sign In' className='btn w-full my-4 bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500' type="submit" />
                </form>
                <p className='text-sm text-center'>New to <span className='text-blue-500'>AAA</span> Technology? <Link className='text-blue-400' to='/signUP'>Sign Up</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'><span className='text-blue-400 text-xl'><FaGoogle/></span>GOOGLE</button>
            </div>
        </div>
    );
};

export default SignIn;