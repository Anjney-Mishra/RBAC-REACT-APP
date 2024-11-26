import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children,allowedRoles}) => {

    const {user} = useAuth();
    const [persistedUser,setPersistedUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setPersistedUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    const currentUser = user || persistedUser;

    if(!currentUser){
        return <Navigate to="/login" replace/>
    }

    if(!allowedRoles.includes(currentUser.role)){
        return navigate(`/`);
    }

    return children;
}

export default ProtectedRoute