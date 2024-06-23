import React, { useEffect, useState } from "react";
import Chaise from "../assets/Chaise2.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = ({ maxProducts }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5050/api/articles/"
				);
				if (response.data && Array.isArray(response.data.data)) {
					setProducts(response.data.data);
				} else {
					console.error("Unexpected response structure:", response.data);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) {
		return <div>Chargement...</div>;
	}

    const displayedProducts = maxProducts ? products.slice(0, maxProducts) : products;

    const backgroundColors = ["bg-red-200", "bg-green-200", "bg-blue-200"];
    const textColors = ["text-red-700", "text-green-700", "text-blue-700"];

	return (
		
            <div className="flex flex-wrap flex-2 justify-center gap-3.5 items-center md:grid md:grid-rows-2 md:grid-cols-2 md:gap-12 md:w-auto lg:flex lg:justify-items-center lg:gap-16">
                {displayedProducts.map((product, index) => (
                    <Link key={product._id} to={`/products/${product._id}`}>
                        <div className={`relative h-96 w-72 flex flex-col items-center justify-evenly pb-5 text-white rounded-xl ${backgroundColors[index % backgroundColors.length]}`}>
                        <img src={Chaise} className="bg-cover bg-center rounded-xl transition-all duration-300" alt="" />
                        <div className={`flex justify-evenly w-full ${textColors[index % textColors.length]}`}>
                            <div>
                                <p className="font-bold">{product.name}</p>
                                <p className="">{product.description}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold">{product.price}€</p>
                            </div>
                        </div>
                    </div></Link>
                ))}
            </div>
	);
};

export default Product;
