import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const PrivateRoute = ({ to, children }) => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        const token = localStorage.getItem("token");
        if (!token) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <Link to={to} onClick={handleClick}>
            {children}
        </Link>
    );
}

export default PrivateRoute;