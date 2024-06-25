import React, { useEffect, useState } from "react";
import Vector from "../assets/Chaise.jpg";
import { Link } from "react-router-dom";
import getAllCategories from "../services/api/allCategories";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [maxCategories, setMaxCategories] = useState(3);
    
	useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await getAllCategories();
                setCategories(allCategories.data);
                console.log(allCategories.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching all categories:', error);
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

		updateMaxCategories();

		window.addEventListener("resize", updateMaxCategories);

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
						<button className="mb-5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700">
							<Link to={category.name}>Découvrir</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Category;
