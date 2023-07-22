import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const MyBuyers = () => {
    const{user}=useContext(AuthContext);
    // Getting all the booking info for specific seller
    const{data:buyerInfos, isLoading}=useQuery({
        queryKey:'buyerInfos',
        queryFn:async()=>{
           try{
            const res = await fetch(`https://used-laptop-shop-server.vercel.app/buyerInfo?email=${user.email}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
           }
           catch(error){
            console.log(error);
           }
        }
    });
    
    if(isLoading){
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>My Buyers </h2>
            <hr />

            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Meeting Location</th>
                            <th>Buyer phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyerInfos.map((buyerInfo, ind) =>
                                <tr key={ind} className="hover">
                                    <th>{ind + 1}</th>
                                    <td>{buyerInfo.productName}</td>
                                    <td>{buyerInfo.buyerName}</td>
                                    <td>{buyerInfo.buyerEmail}</td>
                                    <td>{buyerInfo.meetingLocation}</td>
                                    <td>{buyerInfo.buyerNumber}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyBuyers;