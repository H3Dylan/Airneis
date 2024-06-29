import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AllCategoriesPage from "../pages/AllCategoriesPage.jsx";
import AllProductsPage from "../pages/AllProductsPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";

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
		path: "/product/:product_id",
		element: <ProductPage />,
		errorElement: <NotFoundPage />,
	},
]);

export default router;