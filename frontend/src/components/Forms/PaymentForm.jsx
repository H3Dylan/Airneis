import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import createPayment from "../../services/api/createPayment";
import getUserInfo from "../../services/api/getUserInfo";

const PaymentForm = ({ onPaymentSuccess, totalAmount }) => {
	const stripe = useStripe();
	const elements = useElements();
    const [userInfo, setUserInfo] = useState(null);
	const [clientSecret, setClientSecret] = useState("");
	// const [selectedCard, setSelectedCard] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
			try {
				const user = await getUserInfo();
                console.log(user);
				if (user) {
					setUserInfo(user);
					// if (user.creditCard && user.creditCard.length > 0) {
					// 	setSelectedCard(user.creditCard[0]);
					// }
				}
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};
		console.log(totalAmount);
        const fetchPaymentIntent = async () => {
            try {
                const response = await createPayment(totalAmount);
                console.log("response", response);
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

    // const handleCardChange = (e) => {
	// 	const cardId = e.target.value;
	// 	setSelectedCard(cardId);
	// };

	const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                // billing_details: {
                //     name: "Jenny Rosen",
                // },
            },
        });

        if (error) {
            console.error(error);
        } else {
            onPaymentSuccess(paymentIntent);
        }
    };

	return (
		<form onSubmit={handleSubmit}>
			{/* {selectedCard.length > 0 && (
				<div>
					<label htmlFor="cardSelect">Choisir une carte</label>
					<select
						id="cardSelect"
						value={selectedCard}
						onChange={handleCardChange}
					>
						<option value="">Nouvelle carte</option>
						{userCards.map((card) => (
							<option key={card.id} value={card.id}>
								Carte se terminant par {card.card.last4}, exp {card.card.exp_month}/{card.card.exp_year}
							</option>
						))}
					</select>
				</div>
			)} */}
			<CardElement />
			<button type="submit" disabled={!stripe || !elements || !clientSecret}>
				Payer
			</button>
		</form>
	);
};

export default PaymentForm;