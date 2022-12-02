import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AuthContext from "../../../context/AuthContext";
import useCustomForm from "../../../hooks/useCustomForm";

const SignUpForm = () => {
	const { registerUser } = useContext(AuthContext);

	const defaultValues = {
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	};

	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		defaultValues,
		registerUser
	);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ display: "flex", flexDirection: "column" }}
		>
			<Typography component={"h1"} variant="h5">
				Sign Up
			</Typography>
			<TextField
				label="Username"
				type="text"
				name="username"
				value={formData.username}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
				autoFocus
			/>
			<TextField
				label="Email"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
			/>
			<TextField
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
			/>
			<TextField
				label="First Name"
				type="text"
				name="firstName"
				value={formData.firstName}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
			/>
			<TextField
				label="Last Name"
				type="text"
				name="lastName"
				value={formData.lastName}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
			/>
			<Button type="submit" variant="contained" sx={{ my: 2 }}>
				Sign up
			</Button>
		</Box>
	);
};

export default SignUpForm;
