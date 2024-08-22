import React, { useEffect, useState } from "react";
import Chaise from "../assets/Chaise2.png";
import { Link } from "react-router-dom";
import getAllProducts from "../services/api/allProducts";

const Product = ({ maxProducts }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts();
                setProducts(allProducts.data);
                console.log(allProducts.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching all products:', error);
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
        <div className="flex flex-wrap flex-2 justify-center gap-3.5 items-center md:gap-12 md:w-auto lg:flex lg:justify-items-center lg:gap-16">
            {displayedProducts.map((product, index) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                    <div className={`relative h-96 w-72 flex flex-col items-center justify-between text-white rounded-xl ${backgroundColors[index % backgroundColors.length]}`}>
                        <img src={Chaise} className="bg-cover bg-center rounded-xl h-[70%]" alt="" />
                        <div className={`flex justify-evenly ${textColors[index % textColors.length]} m-5`}>
                            <div>
                                <p className="font-bold">{product.name}</p>
                                <p className="">{product.shortDescription}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold">{product.price}€</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
	);
};

export default Product;
