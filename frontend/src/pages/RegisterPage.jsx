import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	return (
		<>
			<Link to="/">Airneis</Link>
			<div>LoginPage</div>
			<p>Already an account ? Go to </p>
			<Link to="/login">Login</Link>
		</>
	);
};

export default RegisterPage;
