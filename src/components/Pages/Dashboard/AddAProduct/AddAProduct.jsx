import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddAProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const imageHostKey = import.meta.env.VITE_APP_imagebb_key;

    // date and time 
    const currentDate = new Date();
    const date = format(currentDate, 'PP');
    const time = format(currentDate, 'hh:mm:ss a');

    const category = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Microsoft", "Huawei"];

    const handleAddProduct = (data) => {
        // Image hosting
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    const { productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productDescription } = data;

                    const product = {
                        sellerName: user.displayName,
                        sellerImage: user.photoURL,
                        email: user.email,
                        productName,
                        originalPrice,
                        resalePrice,
                        yearOfPurchase,
                        category,
                        condition,
                        location,
                        phoneNumber,
                        productImage: imgData.data.url,
                        productDescription,
                        date,
                        time
                    }

                    // Sending the product information to the database
                    fetch('https://used-laptop-shop-server.vercel.app/product', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                toast.success("Product added successfully.");
                                reset();
                                navigate('/dashboard/myProduct');
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Add Your Product</h2>
            <hr />
            <form className='mx-5' onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    {/* Product Name */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("productName", {
                            required: "Product name is required.",
                            maxLength: { value: 25, message: "Maximum 25 characters." }
                        })} type="text" placeholder="Product Name" className="input input-bordered w-full" />
                        {errors.productName && <p className='text-sm mt-2 text-red-500'>{errors.productName?.message}</p>}
                    </div>

                    {/* Original Price */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input {...register("originalPrice", {
                            required: "Original price required.",
                            maxLength: { value: 15, message: "Maximum 15 characters." }
                        })} type="number" placeholder="Original Price" className="input input-bordered w-full" />
                        {errors.originalPrice && <p className='text-sm mt-2 text-red-500'>{errors.originalPrice?.message}</p>}
                    </div>

                    {/* Resale Price */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input {...register("resalePrice", {
                            required: "Resale price is required.",
                            maxLength: { value: 15, message: "Maximum 15 characters." }
                        })} type="number" placeholder="Resale Price" className="input input-bordered w-full" />
                        {errors.resalePrice && <p className='text-sm mt-2 text-red-500'>{errors.resalePrice?.message}</p>}
                    </div>

                    {/* Year of purchase */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Year of purchase</span>
                        </label>
                        <input {...register("yearOfPurchase", {
                            required: "Year of purchase is required."
                        })} type="number" placeholder="Year of purchase" className="input input-bordered w-full" />
                        {errors.yearOfPurchase && <p className='text-sm mt-2 text-red-500'>{errors.yearOfPurchase?.message}</p>}
                    </div>

                    {/* Product category */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select {...register("category", { required: true })} className="select select-bordered">
                            {
                                category.map((laptopCategory, ind) =>
                                    <option key={ind}>{laptopCategory}</option>
                                )
                            }
                        </select>
                    </div>

                    {/* Product condition */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Condition</span>
                        </label>
                        <select {...register("condition", { required: true })} className="select select-bordered">
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input {...register("location", {
                            required: "Location is required."
                        })} type="text" placeholder="Your Location" className="input input-bordered w-full" />
                        {errors.location && <p className='text-sm mt-2 text-red-500'>{errors.location?.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input {...register("phoneNumber", {
                            required: "Product name is required."
                        })} type="number" placeholder="Phone Number" className="input input-bordered w-full" />
                        {errors.phoneNumber && <p className='text-sm mt-2 text-red-500'>{errors.phoneNumber?.message}</p>}
                    </div>

                    {/* Product image */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Photo</span>
                        </label>
                        <input {...register("image", {
                            required: "Product photo is required."
                        })} type="file" placeholder="Type here" className="file-input file-input-bordered w-full" />
                        {errors.image && <p className='text-sm mt-2 text-red-500'>{errors.image?.message}</p>}
                    </div>

                    {/* Product Description */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea {...register("productDescription", {
                            required: "Product description is required."
                        })} className="textarea textarea-bordered w-full" placeholder="Product Description"></textarea>
                        {errors.productDescription && <p className='text-sm mt-2 text-red-500'>{errors.productDescription?.message}</p>}
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <input className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 my-5' type="submit" value="Add Product" />
                </div>
            </form>
        </div>
    );
};

export default AddAProduct;