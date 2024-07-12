import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import "./index.css";
import { CartProvider } from './components/CartContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
        <CartProvider>
		    <RouterProvider router={router} />
        </CartProvider>
	</React.StrictMode>
);
