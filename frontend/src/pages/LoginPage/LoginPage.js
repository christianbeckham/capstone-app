import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

import "./LoginPage.css";

const LoginPage = () => {
	const defaultValues = { username: "", password: "" };
	const { loginUser, isServerError } = useContext(AuthContext);
	const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
		defaultValues,
		loginUser
	);

	useEffect(() => {
		if (isServerError) {
			reset();
		}
	}, [isServerError]);

	return (
		<div className="container">
			<form className="form" onSubmit={handleSubmit}>
				<label>
					Username:{" "}
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Password:{" "}
					<input
						type="text"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
				</label>
				{isServerError ? (
					<p className="error">Login failed, incorrect credentials!</p>
				) : null}
				<Link to="/register">Click to register!</Link>
				<button>Login!</button>
			</form>
		</div>
	);
};

export default LoginPage;
