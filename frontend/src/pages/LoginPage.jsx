import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import Header from "../components/Header/Header";

const LoginPage = () => {
	return (
		<>
			<Header />
			<div className="bg-blue-600 flex-col">
				<h2 className="text-center">Login</h2>
				<LoginForm />
				<p>No account ? Go to </p>
				<Link to="/register">Register</Link>
			</div>
		</>
	);
};

export default LoginPage;
