import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const EditProduct = () => {
    const productInfo = useLoaderData();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { _id, productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productDescription } = productInfo;

    const categories = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Microsoft", "Huawei"];

    // Edit funciton
    const handleEditProduct = (data) => {
        const { productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productDescription } = data;

        const product = {
            productName,
            originalPrice,
            resalePrice,
            yearOfPurchase,
            category,
            condition,
            location,
            phoneNumber,
            productDescription
        }

        // Updating product info in the database
        fetch(`https://used-laptop-shop-server.vercel.app/products/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Product Info Updated.");
                    navigate('/dashboard/myProduct');
                }
            })
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Edit Product</h2>
            <hr />
            <form className='mx-5' onSubmit={handleSubmit(handleEditProduct)}>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    {/* Product Name */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("productName", {
                            required: "Product name is required.",
                            maxLength: { value: 25, message: "Maximum 25 characters." }
                        })} type="text" defaultValue={productName} placeholder="Product Name" className="input input-bordered w-full" />
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
                        })} type="number" defaultValue={originalPrice} placeholder="Original Price" className="input input-bordered w-full" />
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
                        })} type="number" defaultValue={resalePrice} placeholder="Resale Price" className="input input-bordered w-full" />
                        {errors.resalePrice && <p className='text-sm mt-2 text-red-500'>{errors.resalePrice?.message}</p>}
                    </div>

                    {/* Year of purchase */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Year of purchase</span>
                        </label>
                        <input {...register("yearOfPurchase", {
                            required: "Year of purchase is required."
                        })} type="number" defaultValue={yearOfPurchase} placeholder="Year of purchase" className="input input-bordered w-full" />
                        {errors.yearOfPurchase && <p className='text-sm mt-2 text-red-500'>{errors.yearOfPurchase?.message}</p>}
                    </div>

                    {/* Product category */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select {...register("category", { required: true })} defaultValue={category} className="select select-bordered">
                            {
                                categories.map((laptopCategory, ind) =>
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
                        <select {...register("condition", { required: true })} defaultValue={condition} className="select select-bordered">
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
                        })} type="text" defaultValue={location} placeholder="Your Location" className="input input-bordered w-full" />
                        {errors.location && <p className='text-sm mt-2 text-red-500'>{errors.location?.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input {...register("phoneNumber", {
                            required: "Product name is required."
                        })} type="number" defaultValue={phoneNumber} placeholder="Phone Number" className="input input-bordered w-full" />
                        {errors.phoneNumber && <p className='text-sm mt-2 text-red-500'>{errors.phoneNumber?.message}</p>}
                    </div>

                    {/* Product Description */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea {...register("productDescription", {
                            required: "Product description is required."
                        })} className="textarea textarea-bordered w-full" defaultValue={productDescription} placeholder="Product Description"></textarea>
                        {errors.productDescription && <p className='text-sm mt-2 text-red-500'>{errors.productDescription?.message}</p>}
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Link to='/dashboard/myProduct'>
                        <button className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 my-5 mx-3' value="Cancel">Cancel</button>
                    </Link>

                    <input className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 my-5' type="submit" value="update" />

                </div>
            </form>
        </div>
    );
};

export default EditProduct;