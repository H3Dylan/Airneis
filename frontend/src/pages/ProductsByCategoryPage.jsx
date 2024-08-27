import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getArticlesByCategory from "../services/api/getArticlesByCategory";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Img from "../assets/Chaise2.png";

const ProductsByCategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await getArticlesByCategory(categoryId);
                if (response.success) {
                    setProducts(response.data);
                } else {
                    console.error('Failed to fetch products by category');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products by category:', error);
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <Header />
            <div className="mt-12">
                <h2 className="text-3xl text-center">Produits dans cette catégorie</h2>
            </div>
            <div className="flex flex-col items-center gap-2 mt-8 mb-12 md:flex-row md:flex-wrap md:justify-evenly lg:max-w-5xl lg:mx-auto">
                {products.length === 0 ? (
                    <p>Aucun produit trouvé dans cette catégorie.</p>
                ) : (
                    products.map((product) => (
                        <Link key={product._id} to={`/product/${product._id}`}>
                            <div className="relative h-96 w-72 flex flex-col items-center justify-evenly pb-5 text-white rounded-xl bg-grey-100">
                                <img src={Img} className="bg-cover bg-center rounded-xl transition-all duration-300" alt={product.name} />
                                <div className="flex justify-evenly w-full">
                                    <div>
                                        <p className="font-bold">{product.name}</p>
                                        <p>{product.shortDescription}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-bold">{product.price}€</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProductsByCategoryPage;
