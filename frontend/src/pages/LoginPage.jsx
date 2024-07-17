import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import Header from "../components/Header/Header";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

	return (
		<>
			<Header />
			<div className="flex flex-col mt-10 mx-auto p-4 bg-blue-500 text-white rounded-md gap-2.5 w-60 md:w-96">
				<h2 className="text-center text-3xl">Login</h2>
				<LoginForm userInfo={userInfo}/>
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
