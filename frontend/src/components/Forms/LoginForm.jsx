import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        setMessage(null);
		setError(null);
		try {
			const response = await axios.post(
				"http://localhost:5050/api/auth/login",
				formData
			);
			const token = response.data.token;
			localStorage.setItem("token", token);
			setMessage(response.data.message);
			setTimeout(() => {
				navigate("/");
			}, 2000);
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
		<form
			className="flex flex-col justify-center items-center gap-5"
			onSubmit={handleSubmit}
		>
			{message && <div className="text-green-500">{message}</div>}
			{error && <div className="text-red-500">{error}</div>}
			<div className="flex flex-col gap-2 w-4/5">
				<div className="flex flex-col gap-1">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						autoComplete="email"
                        placeholder="Email"
						required
						className="text-black p-2 rounded-md"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="current-password"
                        placeholder="Mot de passe"
						required
						className="text-black p-2 rounded-md"
					/>
				</div>
			</div>
			<button type="submit" className="btn_secondary p-2 rounded-lg">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
