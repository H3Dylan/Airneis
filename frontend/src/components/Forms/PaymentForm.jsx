import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import createPayment from "../../services/api/createPayment";
import getUserInfo from "../../services/api/getUserInfo";

const PaymentForm = ({ onPaymentSuccess, totalAmount }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [userInfo, setUserInfo] = useState(null);
	const [clientSecret, setClientSecret] = useState("");
	const [cardHolderName, setCardHolderName] = useState("");

	const elementStyles = {
		style: {
			base: {
				color: "#000000",
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#aab7c4",
				},
				padding: "10px",
				border: "1px solid #ced4da",
				borderRadius: "0.25rem",
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const user = await getUserInfo();
				setUserInfo(user);
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};

		const fetchPaymentIntent = async () => {
			try {
				const response = await createPayment(totalAmount);
				if (response.success) {
					setClientSecret(response.data);
				} else {
					console.error("Failed to create PaymentIntent");
				}
			} catch (error) {
				console.error("Error fetching payment intent:", error);
			}
		};
		fetchUserInfo();
		fetchPaymentIntent();
	}, [totalAmount]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentIntent } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: cardElement,
					billing_details: {
						name: cardHolderName,
					},
				},
			}
		);

		if (error) {
			console.error(error);
		} else {
			onPaymentSuccess(paymentIntent);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-[300px] m-auto md:w-[300px]  space-y-4"
		>
			<div>
				<label htmlFor="card-holder-name">Nom du titulaire*</label>
				<input
					id="card-holder-name"
					type="text"
					name="cardHolderName"
					className="p-2 border border-gray-300 rounded w-full"
					value={cardHolderName}
					onChange={(e) => setCardHolderName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="card-element">Détails de la carte*</label>
				<CardElement
					id="card-element"
					options={{ elementStyles, hidePostalCode: true }}
				/>
			</div>
			<button
				className="btn_primary self-center p-2 rounded-lg"
				type="submit"
				disabled={!stripe}
			>
				Payer
			</button>
		</form>
	);
};

export default PaymentForm;
