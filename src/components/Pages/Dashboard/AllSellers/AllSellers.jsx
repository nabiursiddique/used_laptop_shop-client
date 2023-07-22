import React, { useState } from 'react';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import { toast } from 'react-hot-toast';
import greenTick from '../../../../assets/Icon/Green Tick.svg';

const AllSellers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const closeModal = () => {
        setDeletingUser(null);
    }

    // Getting all the user 
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/allSellers?role=Seller', {
                    headers: {
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
    });


    // Verifying a seller
    const handleVerifySeller = (email) => {
        fetch(`http://localhost:5000/verifySeller?email=${email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ verified: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Verified");
                    refetch();
                }
            })
    }



    // Delete user from database (This option will be only for admin role)
    const handleDeleteUser = (seller) => {
        fetch(`http://localhost:5000/allUsers/${seller._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast.success("User deleted successfully.");
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>;
    }
    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Sellers </h2>

            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, ind) =>
                                <tr key={ind} className="hover">
                                    <th>{ind + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-circle w-12 h-12">
                                                <img src={seller.imageURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{seller.name}</td>
                                    <td>{seller.role}</td>
                                    <td>{seller.email}</td>
                                    {
                                        seller.verified ?
                                            <td className='p-0'>
                                                <div>
                                                    <img className='w-1/3' src={greenTick} alt="" />
                                                </div>
                                                <p className='text-green-500'>Verified</p>
                                            </td>
                                            :
                                            <td className='p-0'><button onClick={() => handleVerifySeller(seller.email)} className='btn btn-xs bg-green-500 text-white border-none '>Verify</button></td>
                                    }
                                    <th>
                                        <label htmlFor="confirmation_modal" onClick={() => setDeletingUser(seller)} className="btn bg-red-400 text-white btn-sm hover:bg-red-500">X</label>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingUser.name}?`}
                    message={`If you delete ${deletingUser.name} it cannot be undone`}
                    deleteFunction={handleDeleteUser}
                    successButtonName={"Delete"}
                    cancelButtonName={"Cancel"}
                    closeModal={closeModal}
                    deletingInfo={deletingUser}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;