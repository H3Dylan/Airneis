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
            <div className="flex-1">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-bold mt-4 text-center">Commande effectuée</h2>
                    <div className="w-[300px] md:w-[500px] mx-1">
                        <p>Merci pour votre achat !</p>
                        <br />
                        <p>
                            
                            Votre commande a bien été enregistrée sous le numéro{" "}
                            {order.data.orderId}. Vous pouvez suivre son état depuis votre
                            espace client.
                        </p>
                    </div>
                    <Link className="btn p-2 rounded-lg" to="/">Continuer mes achats</Link>
                </div>
            </div>
            <Footer />
		</>
	);
};

export default SuccessPage;
