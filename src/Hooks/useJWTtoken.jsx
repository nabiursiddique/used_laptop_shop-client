import { useEffect, useState } from "react";

const useJWTtoken = (email) => {
    const [token, setToken] = useState('');
    
    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data =>{
                if(data.accessToken){
                    localStorage.setItem("accessToken",data.accessToken);
                    setToken(data.accessToken);
                }
            });
        }
    },[email])
    return [token];
};

export default useJWTtoken;