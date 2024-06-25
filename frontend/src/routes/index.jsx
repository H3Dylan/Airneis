import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AllCategories from "../pages/AllCategories.jsx";
import AllProducts from "../pages/AllProducts.jsx";

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
        element: <AllCategories />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/products",
        element: <AllProducts />,
        errorElement: <NotFoundPage />
    }
]);

export default router;