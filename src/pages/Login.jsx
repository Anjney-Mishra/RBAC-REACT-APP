import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    if(user){
        navigate(`/`);
    }

    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');


    const {login} = useAuth();

    let allUsers = null;
    const getUsers = localStorage.getItem('users');
    if(getUsers) allUsers = JSON.parse(getUsers);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = allUsers.find(
            (u) => u.username === username && u.password === password
        );
        if(user){
            login(user);
            setError("");
            navigate(`/`);
        }else{
            setError("Invalid username or password");
        }
    }

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-96 p-6 shadow-lg rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">LOGIN</h2>
        <form onSubmit={handleLogin}>
        <div className="mb-4">
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
        </div>
        <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
            Login
            </button>
        </form>
    </div>
    </div>
  )
}

export default Login