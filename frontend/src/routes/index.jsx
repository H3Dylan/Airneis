import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AllCategoriesPage from "../pages/AllCategoriesPage.jsx";
import AllProductsPage from "../pages/AllProductsPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import ShippingPage from "../pages/ShippingPage.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import SuccessPage from "../pages/SuccessPage.jsx";

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
	{
		path: "/cart",
		element: <CartPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/checkout",
		element: <CheckoutPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/shipping",
		element: <ShippingPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/payment",
		element: <PaymentPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/success",
		element: <SuccessPage />,
		errorElement: <NotFoundPage />,
	},
]);

export default router;
