import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/logo_black.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import PrivateRoute from "../../routes/PrivateRoute";

const Footer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

	return (
        <footer className="bg-yellow-300 p-5 text-center">
            <div className="flex flex-col gap-3 justify-evenly mb-3 md:flex-row">
                <div className="flex flex-col">
                    <h4 className="font-semibold">Informations légales</h4>
                    <Link to="contact-us">Nous contacter</Link>
                    <Link to="legals-mentions">Mentions légales</Link>
                    <Link to="GTC">Conditions Générales de Vente</Link>
                    <Link to="GCU">Contditions Générales d'Utilisation</Link>
                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold">Mon compte</h4>
                    {!isLoggedIn && (
                        <Link to="/login">Se connecter</Link>
                    )}
                    {isLoggedIn && (
                        <Link
                        onClick={handleLogout}>
                            Se déconnecter
                        </Link>
                    )}
                    <PrivateRoute>
                        <Link to="orders">Etat des commandes</Link>
                    </PrivateRoute>
                    <Link to="/register">S'enregister</Link>
                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold">Aides</h4>
                    <Link>Expéditions</Link>
                    <Link>Retours</Link>
                </div>
                <div className="flex flex-col gap-1 md:order-first">
                    <img src={Logo} alt="Airneis logo mobile" className="logo mx-auto" />
                    <div className="flex gap-3 justify-center">
                        <Link><FaFacebook /></Link>
                        <Link><FaInstagram /></Link>
                        <Link><FaLinkedin /></Link>
                        <Link><FaTwitter /></Link>
                    </div>
                    <div>
                        <p>Addresse</p>
                        <p>+33 01 02 03 04 05</p>
                        <p>23 Rue de la Tour, 75008 Paris</p>
                    </div>
                </div>
            </div>
            <p className="dream_avenue_font">Copyright 2024 © All Rights Reserved</p>
        </footer>
    );
};

export default Footer;
