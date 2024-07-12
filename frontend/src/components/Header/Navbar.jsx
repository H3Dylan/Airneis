import React from "react";
import { Link } from "react-router-dom";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useCart } from '../CartContext';
import logo from "../../assets/Logo/logo.svg";
import BurgerMenu from "./BurgerMenu";
import ProfileDropdown from "../ProfileDropdown";
import CartIcon from "./CartIcon";

const Navbar = () => {
    const { getCartCount } = useCart();
	return (
        <nav className="flex justify-between items-center h-full p-2.5">
            <Link to="/" className="block">
					<img src={logo} alt="Airneis logo mobile" className="logo" />
            </Link>
            <ul className="hidden text-white lg:gap-5 lg:flex">
                <li><Link to="/categories">Catégories</Link></li>
                <li><Link to="/products">Produits</Link></li>
                <li><Link to="/about">À propos</Link></li>
                <li><Link to="/contact-us">Nous contacter</Link></li>
            </ul>
            <ul className="flex items-center h-12 text-white gap-3 lg:gap-7">
                <li><Link to="/search"><HiMiniMagnifyingGlass size={30}/></Link></li>
                <CartIcon />
                <li><ProfileDropdown /></li>
                <li className="lg:hidden"><BurgerMenu /></li>
            </ul>
        </nav>
    )
};

export default Navbar;
