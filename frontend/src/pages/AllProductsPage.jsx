import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import getAllProducts from "../services/api/allProducts";
import { Link } from "react-router-dom";
import Img from "../assets/Chaise2.png";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts();
                setProducts(allProducts.data);
                console.log(allProducts.data);
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        }; 

        fetchProducts();
    }, []);

	return (
        <>
            <Header />
            <div className="mt-12">
                <h2 className="text-3xl text-center">Liste des produits</h2>
            </div>
            <div className="flex flex-col items-center gap-2 mt-8 mb-12 md:flex-row md:flex-wrap md:justify-evenly lg:max-w-5xl lg:mx-auto">
                {products.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`}>
                        <div className={"relative h-96 w-72 flex flex-col items-center justify-evenly pb-5 text-white rounded-xl bg-grey-100"}>
                            <img src={Img} className="bg-cover bg-center rounded-xl transition-all duration-300" alt="" />
                            <div className={"flex justify-evenly w-full"}>
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
            <Footer />
        </>
    );
};

export default AllProducts;
