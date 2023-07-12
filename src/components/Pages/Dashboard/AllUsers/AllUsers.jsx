import React, { useState } from 'react';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    // Getting all the user 
    fetch('http://localhost:5000/allUsers')
        .then(res => res.json())
        .then(data => setAllUsers(data))
    return (
        <div>
            <h2 className='text-3xl text-center my-5 font-bold'>All users </h2>

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((allUser, ind) =>
                                <tr className="hover">
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
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;