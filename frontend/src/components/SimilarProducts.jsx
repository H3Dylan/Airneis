import React, { useState, useEffect } from "react";
import getSimilarProducts from "../services/api/similarProducts";
import { Link, useLocation } from "react-router-dom";
import Chaise from "../assets/Chaise2.png";

const SimilarProducts = ({ category, product }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchSimilarProduct = async () => {
            try {
                const similarProducts = await getSimilarProducts(category, product);
                setSimilarProducts(similarProducts);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };

        if (category) {
            fetchSimilarProduct();
        }
    }, [category, product]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    const backgroundColors = ["bg-red-200", "bg-green-200", "bg-blue-200"];
    const textColors = ["text-red-700", "text-green-700", "text-blue-700"];

    return (
        <>
            {similarProducts.length > 0 ? (
                <div className="flex flex-col gap-3.5 md:grid md:grid-rows-3 md:grid-cols-2 md:gap-12 md:w-auto lg:grid-rows-2 lg:grid-cols-3 lg:justify-items-center lg:gap-16">
                    {similarProducts.map((product, index) => (
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
            </div>) : (<p>Aucun produits similaires</p>)}
        </>
        );
};

export default SimilarProducts;