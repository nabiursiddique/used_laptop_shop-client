import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal =()=>{
        setDeletingProduct(null);
    }

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: 'products',
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/products?email=${user.email}`)
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    if(isLoading){
        return <LoadingAnimation></LoadingAnimation>
    }

    // Method for deleting the product
    const handleDeleteProduct = (product) =>{
        fetch(`http://localhost:5000/products/${product._id}`,{
            method:"DELETE"
        })
        .then(res => res.json())
        .then(result =>{
            if(result.acknowledged){
                toast.success('Product deleted successfully.');
                refetch();
            }
        })
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Your Products</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, ind) => <tr>
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
                                    <div className="text-sm"><span className='font-bold'>Orginal Price: </span>{product.originalPrice}</div>
                                    <div className="text-sm"><span className='font-bold'>Resale Price:</span> {product.resalePrice}</div>
                                </td>
                                <td>Purple</td>
                                <td>
                                    <label htmlFor="confirmation_modal" onClick={()=>setDeletingProduct(product)} className="btn btn-error text-white btn-sm">X</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && 
                <ConfirmationModal
                    title={`Want to delete ${deletingProduct.productName}?`}
                    message ={`If you delete ${deletingProduct.productName} it cannot be undone.`}
                    closeModal={closeModal}
                    successButtonName={"Delete"}
                    cancelButtonName={"Cancel"}
                    deleteFunction={handleDeleteProduct}
                    productInfo={deletingProduct}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;