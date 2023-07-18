import React from 'react';

const ProductsCard = ({ product, setBookProduct }) => {
    const { sellerName, sellerImage, email, productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productImage, productDescription, date, time, booked } = product;
    return (
        <div className="card bg-base-100 shadow-xl border border-white">
            <figure><img className='lg:h-80 md:h-80 sm:h-auto' src={productImage} alt={category} /></figure>
            <div className="card-body">
                <div className='flex items-center'>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={sellerImage} />
                        </div>
                    </div>
                    <h3 className='ml-3 font-bold'>{sellerName}</h3>
                </div>
                <p className='text-xs'><span className='font-bold'>Posted on:</span> <span className='font-bold text-blue-600'>{date}</span>  {time}</p>
                <h2 className="card-title uppercase">{productName}</h2>
                <p className='text-sm'><span className='font-bold'>Location:</span> {location}</p>
                <p className='text-sm'><span className='font-bold'>Conditon:</span> {condition}</p>
                <p className='text-sm'><span className='font-bold'>Purchase Year:</span> {yearOfPurchase}</p>
                <p className='text-sm'><span className='font-bold'>Email:</span> {email}</p>
                <p className='text-sm'><span className='font-bold'>Phone Number:</span> {phoneNumber}</p>
                <h4><span className='font-bold'>Orginal Price:</span> {originalPrice}৳ </h4>
                <h4><span className='font-bold'>Resale Price:</span> {resalePrice}৳</h4>
                <div className="card-actions">
                    <label onClick={() => setBookProduct(product)} htmlFor="book_now_modal" className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 w-full'>Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;