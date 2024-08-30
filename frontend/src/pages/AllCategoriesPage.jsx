import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import getAllCategories from "../services/api/allCategories";
import { Link } from "react-router-dom";
import Img from "../assets/Chaise.jpg";

const AllCategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                if (response.success) {
                    setCategories(response.data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Header />
            <div className="mt-12">
                <h2 className="text-3xl text-center">Liste des catégories</h2>
            </div>
            <div className="flex flex-col items-center gap-2 mt-8 mb-12 md:flex-row md:flex-wrap md:justify-evenly lg:max-w-5xl lg:mx-auto">
                {categories.map((category) => (
                    <Link key={category._id} to={`/category/${category._id}`}>
                        <div className="relative h-72 w-72 flex items-end justify-center text-white rounded-xl">
                            <img src={Img} alt="" className="absolute bg-cover bg-center rounded-xl transition-all duration-300" />
                            <div className="flex flex-col h-3/6 justify-between items-center z-0">
                                <span>{category.name}</span>
                                <button className="mb-5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700">
                                    Découvrir
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default AllCategoriesPage;
