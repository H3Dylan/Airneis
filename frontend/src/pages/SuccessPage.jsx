import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const SuccessPage = () => {
	const location = useLocation();
	const { order } = location.state || {};
	return (
		<>
            <Header />
			<h1>Commande effectuée</h1>
			<p>
				Votre commande a bien été enregistrée sous le numéro{" "}
				{order.data.orderId}. Vous pouvez suivre son état depuis votre
				espace client.
			</p>
			<Link to="/">Retour a l'accueil</Link>
            <Footer />
		</>
	);
};

export default SuccessPage;
