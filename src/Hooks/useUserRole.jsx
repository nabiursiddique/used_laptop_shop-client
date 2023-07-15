import { useEffect, useState } from "react"

const useUserRole =(email)=>{
    const [isLoadingRole,setIsLoadingRole]=useState(true);
    const [role, setRole]=useState(null);

    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/allUsersRole?email=${email}`)
            .then(res => res.json())
            .then(data =>{
                if(data){
                    setRole(data[0]?.role);
                    setIsLoadingRole(false);
                }
            })
        }
    },[email])
    return [role, isLoadingRole]

};

export default useUserRole;