import React from "react";
import { Link } from "react-router-dom";
import { HiMiniMagnifyingGlass, HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi2";
import logo from "../../assets/Logo/logo.svg";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
	return (
        <nav className="lg:flex lg:items-center lg:justify-between lg:w-4/6">
            <ul className="hidden text-white lg:gap-5 lg:flex">
                <li><Link to="/categories">Catégories</Link></li>
                <li><Link to="/products">Produits</Link></li>
                <li><Link to="/about">À propos</Link></li>
                <li><Link to="/contact-us">Nous contacter</Link></li>
            </ul>
            <ul className="flex items-center h-12 text-white gap-3 lg:gap-7">
                <li><Link to="/search"><HiMiniMagnifyingGlass size={30}/></Link></li>
                <li><Link to="/cart"><HiOutlineShoppingCart size={30}/></Link></li>
                <li><Link to="/profile"><HiOutlineUserCircle size={30}/></Link></li>
                <li className="lg:hidden"><BurgerMenu /></li>
            </ul>
        </nav>
    )
};

export default Navbar;
