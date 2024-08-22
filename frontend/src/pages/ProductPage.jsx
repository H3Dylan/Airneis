import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import getProductById from "../services/api/productById";
import getSimilarProducts from "../services/api/similarProducts";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Cube from "../assets/cube.webp";
import Vector from "../assets/vector.jpg";
import Carousel1 from "../assets/carousel1.jpg";
import big from "../assets/big.jpg";
import "swiper/css";
import SimilarProducts from "../components/SimilarProducts";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
	const [product, setProduct] = useState("");
	const { product_id } = useParams();
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const product = await getProductById(product_id);
				console.log(product);
				setProduct(product);
			} catch (error) {
				console.error("Error fetching a product:", error);
			}
		};
		fetchProduct();
	}, [product_id]);

	const handleAddToCart = () => {
		// addToCart(product);
		localStorage.setItem(`cart`, JSON.stringify(product));
	};

	return (
		<>
			<Header />
			<div className="lg:mt-3">
				<div className="lg:flex lg:justify-between lg:gap-5 lg:px-5 lg:max-w-[2400px] lg:mx-auto lg:flex-2">
					<Swiper
						spaceBetween={20}
						slidesPerView={1}
						className="lg:max-w-[70%] m-0"
					>
						<SwiperSlide className="lg:w-[66%] aspect-video">
							<img className="w-full h-cover" src={big} alt="" />
						</SwiperSlide>
						<SwiperSlide className="lg:w-[66%] aspect-video">
							<img
								className="w-full h-full"
								src={Vector}
								alt=""
							/>
						</SwiperSlide>
						<SwiperSlide className="lg:w-[66%] aspect-video">
							<img
								className="w-full h-full"
								src={Carousel1}
								alt=""
							/>
						</SwiperSlide>
					</Swiper>
					<div className="m-5 md:max-w-xl md:mx-auto lg:m-0 lg:my-auto lg:flex-1">
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
							<p className="text-justify py-5 border-y border-solid border-gray-400">
								{product.detailsDescription}
							</p>
						</div>
						<div className="my-auto pt-5 flex justify-center">
							{product.stock != 0 ? (
								<button
									onClick={() => addToCart(product)}
									className="btn p-2 rounded-lg"
								>
									Ajouter au panier
								</button>
							) : (
								<button className="btn p-2 rounded-lg">
									Indisponible
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center my-12 gap-4">
					<h2 className="text-center text-xl">Produits similaires</h2>
					<SimilarProducts
						category={product.category}
						product={product_id}
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductPage;
