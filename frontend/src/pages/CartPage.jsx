import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import Img from "../assets/Chaise2.png";

const CartPage = () => {
	const {
		cart,
		addToCart,
		removeFromCart,
		deleteFromCart,
		updateQuantity,
		clearCart,
	} = useContext(CartContext);
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const handleQuantityChange = (productId, quantity, maxStock) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0 && parsedQuantity <= maxStock) {
            updateQuantity(productId, parsedQuantity);
        }
    };

	const getTotalPrice = () => {
		return cart
			.reduce((acc, item) => acc + item.price * item.quantity, 0)
			.toFixed(2);
	};

	const calculateTVA = (totalPrice) => {
		const tvaRate = 0.2;
		return (totalPrice * tvaRate).toFixed(2);
	};

	const getTotalTTC = (totalPrice) => {
		const tva = calculateTVA(totalPrice);
		return (parseFloat(totalPrice) + parseFloat(tva)).toFixed(2);
	};

	const checkoutRedirect = () => {
		navigate("/checkout", { state: { totalTTC } });
	};

	const totalPrice = getTotalPrice();
	const totalTVA = calculateTVA(totalPrice);
	const totalTTC = getTotalTTC(totalPrice);

	return (
		<>
			<Header />
			<div className="my-12 flex-1">
				<h2 className="text-2xl text-center font-bold mb-4">
					Mon Panier
				</h2>
				<div className="flex flex-col md:flex-row md:mx-auto md:justify-evenly md:min-w-[600px]  md:max-w-5xl">
					<div>
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center gap-1 text-center p-2 border-b border-gray-300"
                                >
                                    <div className="flex items-center">
                                        <div className="w-2/4 max-w-40">
                                            <img src={Img} alt="" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p>{item.shortDescription}</p>
                                            <p>Stock disponible: {item.stock}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <p>{(item.price * item.quantity).toFixed(2)} €</p>
                                        <div className="flex gap-1 justify-end">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="p-2 rounded-full"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                max={item.stock}
                                                onChange={(e) =>
                                                    handleQuantityChange(item._id, e.target.value, item.stock)
                                                }
                                                className="w-16 p-1 border rounded text-center"
                                            />
                                            {item.quantity < item.stock && (
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="p-2 rounded-full"
                                                >
                                                    +
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <HiOutlineTrash
                                                size={30}
                                                onClick={() => deleteFromCart(item._id)}
                                                className="hover:cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <p>Votre panier est vide.</p>
                                {!isAuthenticated && (
                                    <div className="flex flex-col items-center mt-2">
                                        <Link to="/login" className="underline">Connectez-vous</Link>
                                        <p>ou</p>
                                        <Link to="/register" className="underline">Inscrivez-vous</Link>
                                    </div>
                                )}
							</div>
						)}
						{cart.length != 0 && (
							<div className="mt-4 flex justify-center">
								<button
									onClick={clearCart}
									className="btn text-white p-2 rounded-lg"
								>
									Vider le panier
								</button>
							</div>
						)}
					</div>
					{cart.length > 0 && (
						<div className="flex flex-col gap-2">
							<div className="flex flex-col justify-between text-right mt-4 mx-4 md:m-0">
								<div className="flex justify-between">
									<span>Total HT:</span>
									<span>{totalPrice} €</span>
								</div>
								<div className="flex justify-between">
									<span>TVA (20%):</span>
									<span>{totalTVA} €</span>
								</div>
								<div className="flex justify-between font-bold">
									<span>Total TTC: </span>
									<span>{totalTTC} €</span>
								</div>
							</div>
							<button
								className="btn_primary self-center p-2 rounded-lg"
								onClick={checkoutRedirect}
							>
								Passer la commande
							</button>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default CartPage;
