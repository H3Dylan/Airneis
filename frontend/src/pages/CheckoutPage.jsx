import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const CheckoutPage = () => {
	const isAuthenticated = useAuth();
	const navigate = useNavigate();
    const location = useLocation();
    const { totalTTC } = location.state || {};

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/shipping', { state: { totalTTC } });
        } else {
            navigate('/login', { state: { from: '/checkout' } });
        }
    }, [isAuthenticated])

    return null;
};


export default CheckoutPage;
