import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AllCategoriesPage from "../pages/AllCategoriesPage.jsx";
import AllProductsPage from "../pages/AllProductsPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import ProductsByCategoryPage from "../pages/ProductsByCategoryPage.jsx"; // Ajouté pour la page des produits par catégorie
import CartPage from "../pages/CartPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/categories",
		element: <AllCategoriesPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/products",
		element: <AllProductsPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/product/:productId",
		element: <ProductPage />,
		errorElement: <NotFoundPage />,
	},
    {
        path: "/category/:categoryId", // Route pour les produits par catégorie
        element: <ProductsByCategoryPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/cart",
        element: <CartPage />,
        errorElement: <NotFoundPage />
    }
]);

export default router;
