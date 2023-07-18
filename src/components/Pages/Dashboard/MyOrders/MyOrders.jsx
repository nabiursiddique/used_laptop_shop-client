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
                const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    if (isLoading) {
        <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>My Orders</h2>
            <hr />
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
        </div>
    );
};

export default MyOrders;