import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext, useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/Forms/PaymentForm";
import getUserIdFromToken from "../services/api/getUserId";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_PUBLIC_KEY);

const PaymentPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { clearCart } = useCart(CartContext);

	const { shippingAddress, totalAmount } = location.state || {};

	console.log("PaymentPage", totalAmount);
	const handlePaymentSuccess = (paymentIntent) => {
		const order = {
			userId: getUserIdFromToken(),
			articles: localStorage.getItem(`cart`),
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
		<div>
			<h1>Page de Paiement</h1>
			<Elements stripe={stripePromise}>
				<PaymentForm
					onPaymentSuccess={handlePaymentSuccess}
					shippingAddress={shippingAddress}
					totalAmount={totalAmount}
				/>
			</Elements>
		</div>
	);
};

export default PaymentPage;
