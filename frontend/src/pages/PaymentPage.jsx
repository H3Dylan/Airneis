import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext, useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/Forms/PaymentForm";
import getUserIdFromToken from "../services/api/getUserId";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_PUBLIC_KEY);

const PaymentPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { clearCart } = useCart(CartContext);

	const { shippingAddress, totalAmount } = location.state || {};

	console.log("PaymentPage", totalAmount);
	const handlePaymentSuccess = (paymentIntent) => {
        const articles = localStorage.getItem(`cart`);
		const order = {
			userId: getUserIdFromToken(),
			articles: JSON.parse(articles),
			shippingAddress,
			totalAmount: totalAmount,
		};

		fetch("http://localhost:5050/api/orders/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		})
			.then((response) => response.json())
			.then((data) => {
				clearCart();
				navigate("/success", { state: { order: data } });
			})
			.catch((error) => {
				console.error("Error creating order:", error);
			});
	};

	return (
        <>
            <Header />
            <div className="flex-1">
                <div>
                    <h2 className="text-xl font-bold my-4 text-center">Paiement</h2>
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            onPaymentSuccess={handlePaymentSuccess}
                            shippingAddress={shippingAddress}
                            totalAmount={totalAmount}
                        />
                    </Elements>
                </div>
            </div>
            <Footer />
        </>
	);
};

export default PaymentPage;
