import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import PrivateRoute from '../../../../Routes/PrivateRoutes/PrivateRoute';

const BookNowModal = ({ bookProduct, handleBooking, closeModal }) => {
    const { user } = useContext(AuthContext);

    const { _id, sellerName, sellerImage, email, productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productImage, productDescription, date, time } = bookProduct;

    return (
        <div>
            {
                user ?
                    <div>
                        <input type="checkbox" id="book_now_modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box lg:p-8 md:p-8 px-2">
                                <form onSubmit={handleBooking}>
                                    <div className="flex font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1"> Product Id :</label>
                                        <input className='bg-transparent' disabled
                                            name='productId'
                                            defaultValue={_id}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1"> Product Name :</label>
                                        <input className='bg-transparent' disabled
                                            name='productName'
                                            defaultValue={productName}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1"> Seller Name :</label>
                                        <input className='bg-transparent' disabled
                                            name='sellerName'
                                            defaultValue={sellerName}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1"> Seller Email :</label>
                                        <input className='bg-transparent' disabled
                                            name='sellerEmail'
                                            defaultValue={email}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1"> Seller Phone Number :</label>
                                        <input className='bg-transparent' disabled
                                            name='sellerPhone'
                                            defaultValue={phoneNumber}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1">Your Name :</label>
                                        <input className='bg-transparent' disabled
                                            name='buyerName'
                                            defaultValue={user.displayName}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1">Your Email :</label>
                                        <input className='bg-transparent' disabled
                                            name='buyerEmail'
                                            defaultValue={user.email}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1">Product Price :</label>
                                        <input className='bg-transparent' disabled
                                            name='productPrice'
                                            defaultValue={resalePrice}
                                            type="text"
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1">Meeting Location :</label>
                                        <input className='bg-transparent border border-blue-400 px-2'
                                            name='meetingLocation'
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className=" flex  font-bold my-3">
                                        <label className="text-base bg-gradient-to-r from-sky-700  to-sky-400 text-transparent bg-clip-text mr-1">Your Phone Number :</label>
                                        <input className='bg-transparent border border-blue-400 px-2'
                                            name='buyerNumber'
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="modal-action">
                                        <button type='submit' className='btn bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500'>Submit</button>
                                        <label onClick={closeModal} className="btn">Close</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <PrivateRoute></PrivateRoute>
                    </>
            }
        </div>
    );
};

export default BookNowModal;