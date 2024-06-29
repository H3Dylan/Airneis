import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import getProductById from "../services/api/productById";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Cube from '../assets/cube.webp';
import Vector from '../assets/vector.jpg';
import Carousel1 from '../assets/carousel1.jpg';
import big from '../assets/big.jpg';
import 'swiper/css';

const ProductPage = () => {
	const [product, setProduct] = useState('');
	// const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false)
	const { product_id } = useParams();
    const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const product = await getProductById(product_id);
				console.log(product);
				setProduct(product);
				// setLoading(false);
			} catch (error) {
				console.error("Error fetching a product:", error);
				// setLoading(false);
			}
		};

		fetchProduct();
	}, []);

    const handleAddToCart = () => {
        // addToCart(product);
        localStorage.setItem(`cart`, JSON.stringify(product));
    };

	return (
		<>
			<Header />
			<div className="mx-auto">
                <div className="hidden md:block">Image représentation</div>
                <div className="lg:flex lg:justify-evenly lg:gap-5 lg:px-5 lg:max-w-[2400px] lg:mx-auto">
                    <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    className="lg:max-w-[70%]">
                        <SwiperSlide className="lg:w-[66%] aspect-video">
                            <img className="w-full h-cover" src={big} alt="" />
                        </SwiperSlide>
                        <SwiperSlide className="lg:w-[66%] aspect-video">
                            <img className="w-full h-full" src={Vector} alt="" />
                        </SwiperSlide>
                        <SwiperSlide className="lg:w-[66%] aspect-video">
                                <img className="w-full h-full" src={Carousel1} alt="" />
                        </SwiperSlide>
                    </Swiper>
                    <div className="m-5 md:max-w-xl md:mx-auto lg:m-0 lg:my-auto ">
                        <div className="flex justify-between items-center pb-5 lg:flex-row-reverse">
                            <div className="lg:flex lg:flex-col lg:items-end">
                                <h2>{product.name}</h2>
                                {product.stock != 0 ? (
                                    <span>En stock</span>
                                ) : (
                                    <span>En rupture de stock</span>
                                )}
                            </div>
                            <p>{product.price} €</p>
                        </div>
                        <div>
                            <p className="text-justify py-5 border-y border-solid border-gray-400">{product.description}</p>
                        </div>
                        <div className="my-auto pt-5 flex justify-center">
                            <button 
                                onClick={handleAddToCart}
                                className="btn p-2 rounded-lg">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Produits similaires</h2>
                </div>
			</div>
			<Footer />
		</>
	);
};

export default ProductPage;
