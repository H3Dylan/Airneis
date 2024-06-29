
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { HiMiniMagnifyingGlass, HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi2";
import './BurgerMenu.css'

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="burger-icon" onClick={toggleMenu}>
                {isOpen ? <HiXMark size={30} /> : <HiBars3 size={30} />}
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
                <ul className="menu-list">
                    <li><Link to="/categories">Catégories</Link></li>
                    <li><Link to="/products">Produits</Link></li>
                    <li><Link to="/about">À propos</Link></li>
                    <li><Link to="/contact-us">Nous contacter</Link></li>
                    <li className='text-center'><button onClick={toggleMenu}>{ isOpen ? <HiXMark size={30} /> : <HiBars3 size={30} />}</button></li>
                </ul>
            </div>
        </>
    );
};

export default BurgerMenu;