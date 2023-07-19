import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-hot-toast';

const AllBuyers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const closeModal = () => {
        setDeletingUser(null);
    }

    // Getting all the user 
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ["buyer"],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/allBuyers?role=Buyer',{
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
    });

    // Delete user from database (This option will be only for admin role)
    const handleDeleteUser = (buyer) => {
        fetch(`http://localhost:5000/allUsers/${buyer._id}`, {
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
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Buyers </h2>

            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, ind) =>
                                <tr key={ind} className="hover">
                                    <th>{ind + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-circle w-12 h-12">
                                                <img src={buyer.imageURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.role}</td>
                                    <td>{buyer.email}</td>
                                    <th>
                                        <label htmlFor="confirmation_modal" onClick={() => setDeletingUser(buyer)} className="btn bg-red-400 text-white btn-sm hover:bg-red-500">X</label>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingUser.name}`}
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

export default AllBuyers;