import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Logout({ className }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };
    return (
        <button
            style={{ backgroundPosition: 'right 10px center' }}
            className={`button ${className}`}
            onClick={logOut}
        >
            {username}
        </button>
    );
}
export default Logout;