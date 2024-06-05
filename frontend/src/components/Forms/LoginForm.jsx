import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
    // const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5050/api/auth/login",
				formData
			);
			const token = response.data.token;
			localStorage.setItem("token", token);
			setMessage(response.data.message);
            // history.push("/");
		} catch (error) {
			console.error(
				"Erreur lors de l'envoi des données au backend:",
				error
			);
			setError(
				"Erreur lors de l'envoi des données au backend: " +
					(error.response?.data?.message || error.message)
			);
		}
	};

	return (
		<div className="flex justify-center h-screen">
			<form onSubmit={handleSubmit}>
				{message && <div className="text-green-500">{message}</div>}
				{error && <div className="text-red-500">{error}</div>}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						autoComplete="email"
						required
						className="mt-1 p-2 block w-full border-gray-300 rounded-md"
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="current-password"
						required
						className="mt-1 p-2 block w-full border-gray-300 rounded-md"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
