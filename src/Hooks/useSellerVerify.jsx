import { useEffect, useState } from "react";

const useSellerVerify=(email)=>{
    const [isLoadingVerified,setIsLoadingVerified]=useState(true);
    const [verified, setVerified]=useState(false);

    useEffect(()=>{
        if(email){
            fetch(`https://used-laptop-shop-server.vercel.app/verifiedUsers?email=${email}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data =>{
                if(data.verified){
                    setVerified(data.verified);
                    setIsLoadingVerified(false);
                }
                return;
            })
        }
    },[email])
    return [verified, isLoadingVerified];
}
export default useSellerVerify;