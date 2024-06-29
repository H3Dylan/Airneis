import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";
import Header from "../components/Header/Header";

const RegisterPage = () => {
	return (
		<>
			<Header />
			<div className="flex flex-col mt-10 mx-auto p-4 bg-blue-500 text-white rounded-md gap-2.5 w-60 md:w-96">
				<h2 className="text-center text-3xl">Register</h2>
				<RegisterForm />
				<div className="text-center">
                    <p>Already an account ? Go to </p>
                    <Link to="/login">Login</Link>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
