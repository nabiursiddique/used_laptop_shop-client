import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    // Getting the user product from database
    const { data: productsInfo = [], isLoading, refetch } = useQuery({
        queryKey: "productsInfo",
        queryFn: async () => {
            try {
                const res = await fetch(`https://used-laptop-shop-server.vercel.app/booking?email=${user?.email}`,{
                    headers:{
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    if (isLoading) {
       return <LoadingAnimation></LoadingAnimation>;
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>My Orders</h2>
            <hr />
            {
                productsInfo.length > 0 ?
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Seller Name</th>
                            <th>Seller Phone Number</th>
                            <th>Meetiing Location</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productsInfo.map((productInfo, ind) =>
                                <tr className="hover">
                                    <th>{ind + 1}</th>
                                    <td>{productInfo.productName}</td>
                                    <td>{productInfo.sellerName}</td>
                                    <td>{productInfo.sellerPhone}</td>
                                    <td>{productInfo.meetingLocation}</td>
                                    <td>{productInfo.productPrice}৳</td>
                                    <td>
                                        {
                                            productInfo.productPrice && !productInfo.paid &&
                                            <Link to={`/dashboard/payment/${productInfo.productId}`}><button className='btn bg-green-600 hover:bg-green-700 text-white btn-sm border-none'>Pay</button></Link>
                                        }
                                        {
                                            productInfo.productPrice && productInfo.paid &&
                                            <p className='text-green-500 font-bold text-base'>Paid</p>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            :
            <div className='flex justify-center items-center h-screen font-extrabold mx-1'>
                <h1 className='lg:text-4xl md:text-3xl text-xl text-center animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear uppercase font-bold  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'>Currently You Don't Have <br /> Any Orders.</h1>
            </div>
            }
        </div>
    );
};

export default MyOrders;