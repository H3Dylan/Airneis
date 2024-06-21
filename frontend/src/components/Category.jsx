import React, { useEffect, useState } from "react";
import Vector from "../assets/Chaise.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [maxCategories, setMaxCategories] = useState(3);
    
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5050/api/categories/"
				);
				if (response.data && Array.isArray(response.data.data)) {
					setCategories(response.data.data);
				} else {
					console.error(
						"Unexpected response structure:",
						response.data
					);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching categories:", error);
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const updateMaxCategories = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth < 425) {
				setMaxCategories(3);
			} else {
				setMaxCategories(6);
			}
		};

		// Initial check
		updateMaxCategories();

		// Add event listener for window resize
		window.addEventListener("resize", updateMaxCategories);

		// Clean up event listener on component unmount
		return () => window.removeEventListener("resize", updateMaxCategories);
	}, []);

	if (loading) {
		return <div>Chargement...</div>;
	}

	const displayedCategories = maxCategories
		? categories.slice(0, maxCategories)
		: categories;

	return (
		<div className="flex flex-col gap-3.5 md:grid md:grid-rows-3 md:grid-cols-2 md:gap-12 md:w-auto lg:grid-rows-2 lg:grid-cols-3 lg:justify-items-center lg:gap-16">
			{displayedCategories.map((category) => (
				<div
					key={category._id}
					className="relative h-72 w-72 flex items-end justify-center text-white rounded-xl"
				>
                    <img src={Vector} alt="" className="absolute bg-cover bg-center rounded-xl transition-all duration-300" />
					<div
						
						
					></div>
					<div className="flex flex-col h-3/6 justify-between items-center z-0">
						<span className="">{category.name}</span>
						<button className="mb-2.5">
							<Link to="/categories">Découvrir</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Category;
