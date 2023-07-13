import React, { useContext, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const navigate = useNavigate();


    const handleSignIn = (data) => {
        // creating user with email and password
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;

                // Updating user name when signing up with email and password
                const userInfo = {
                    displayName: data.name,
                    photoURL: data.image
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserToDB(data.accountType, data.name, data.email, data.image);
                    })
                    .catch((error) => console.log(error.message));

                if (user) {
                    toast.success('Log In Successful');
                    reset();
                    navigate('/');
                }
            })
            .catch(err => {
                setSignUpError(err.message);
            });

    }

    // Saving users data into database
    const saveUserToDB = (role, name, email, imageURL) => {
        const user = { role, name, email, imageURL }
        fetch('http://localhost:5000/allUsers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log("User added successfully.");
                }
            })
    }


    const google = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                if (user) {
                    toast.success("Log In Successful");
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className='h-auto flex justify-center items-center'>
            <div className='w-96 p-7 my-7 shadow-lg border border-white rounded-lg'>
                <h2 className='text-center text-4xl mt-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>SIGN UP</h2>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Account Type</span>
                        </label>
                        <select {...register("accountType", { required: true })} className="select select-bordered">
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", {
                            required: "Name is required.",
                            maxLength: { value: 15, message: "Maximum 15 characters." },
                            minLength: { value: 4, message: "Name must be at least 4 letters" }
                        })} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-sm mt-2 text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {
                            required: "Email Address is required."
                        })} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Image URL</span></label>
                        <input {...register("image", {
                            required: "Image link is required."
                        })} type="text" placeholder="Your Image Url" className="input input-bordered w-full" />
                        {errors.image && <p className='text-sm mt-2 text-red-500'>{errors.image?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required: "Password is required.",
                            maxLength: 20,
                            minLength: { value: 6, message: "Password must be at least 6 characters." },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                message: 'Password must be strong.'
                            }
                        })} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-sm mt-2 text-red-500'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    {
                        signUpError && <p className='text-red-500 my-2'>{signUpError}</p>
                    }
                    <input value='Sign Up' className='btn w-full my-4 bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500' type="submit" />
                </form>
                <p className='text-sm text-center'>Already have an account? <Link className='text-blue-400' to='/signIn'>Sign In</Link> </p>
                <div className="divider">OR</div>
                <button onClick={google} className='btn btn-outline w-full'><span className='text-blue-400 text-xl'><FaGoogle /></span>GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;