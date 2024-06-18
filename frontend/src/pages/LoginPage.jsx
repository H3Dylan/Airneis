import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import Header from "../components/Header/Header";

const LoginPage = () => {
	return (
		<>
			<Header />
			<div className="flex flex-col mt-10 mx-auto p-4 bg-blue-500 text-white rounded-md gap-2.5 w-60 md:w-96">
				<h2 className="text-center text-3xl">Login</h2>
				<LoginForm />
				<div className="text-center">
					<p>
						No account ? Go to <Link to="/register" className="underline lg:no-underline lg:hover:underline">Register</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
