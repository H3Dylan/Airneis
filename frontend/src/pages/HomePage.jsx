import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

const HomePage = () => {
    return (
        <>
        <Header />
        <div>HomePage</div>
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
        </>
    )
};

export default HomePage;
