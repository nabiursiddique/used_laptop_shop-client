import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: 'products',
        queryFn: async () => {
            try {
                const res = await fetch(`https://used-laptop-shop-server.vercel.app/userProducts?email=${user.email}`,{
                    headers:{
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (error) {
            }
        }
    });

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    // Method for deleting the product
    const handleDeleteProduct = (product) => {
        fetch(`https://used-laptop-shop-server.vercel.app/products/${product._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast.success('Product deleted successfully.');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Your Products</h2>
            <hr />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Condition</th>
                            <th>Booking status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, ind) =>
                                <tr className='hover' key={ind}>
                                    <th>
                                        {ind + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.productImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-50">{product.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm"><span className='font-bold'>Orginal Price: </span>{product.originalPrice}৳</div>
                                        <div className="text-sm"><span className='font-bold'>Resale Price:</span> {product.resalePrice}৳</div>
                                    </td>
                                    <td>{product.condition}</td>
                                    {
                                        product.booked ?
                                            <td><p>Booked</p></td>
                                            :
                                            <td><p>Not Booked</p></td>
                                    }
                                    {
                                        product.booked ?
                                            <td>
                                                <label htmlFor="confirmation_modal" onClick={() => setDeletingProduct(product)} className="btn bg-red-400 text-white hover:bg-red-500 btn-sm" disabled>X</label>
                                            </td>
                                            :
                                            <td>
                                                <label htmlFor="confirmation_modal" onClick={() => setDeletingProduct(product)} className="btn bg-red-400 text-white hover:bg-red-500 btn-sm">X</label>
                                            </td>
                                    }
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct &&
                <ConfirmationModal
                    title={`Want to delete ${deletingProduct.productName}?`}
                    message={`If you delete ${deletingProduct.productName} it cannot be undone.`}
                    closeModal={closeModal}
                    successButtonName={"Delete"}
                    cancelButtonName={"Cancel"}
                    deleteFunction={handleDeleteProduct}
                    deletingInfo={deletingProduct}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;