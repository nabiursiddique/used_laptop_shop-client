import React from 'react';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const AllUsers = () => {
    // Getting all the user 
    const {data:allUsers =[],isLoading} = useQuery({
        queryKey:["allUser"],
        queryFn:async()=>{
           try{
            const res = await fetch('http://localhost:5000/allUsers');
            const data = await res.json()
            return data;
           }
           catch{

           }

        }
    });

    if(isLoading){
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Users </h2>

            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
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
                            allUsers.map((allUser, ind) =>
                                <tr key={ind} className="hover">
                                    <th>{ind + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-circle w-12 h-12">
                                                <img src={allUser.imageURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{allUser.name}</td>
                                    <td>{allUser.role}</td>
                                    <td>{allUser.email}</td>
                                    <th>
                                    <button className="btn btn-error text-white btn-sm">X</button>
                                </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;