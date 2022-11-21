import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const SignInForm = () => {
	const { loginUser, isServerError } = useContext(AuthContext);

	const defaultValues = { username: "", password: "" };
	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		defaultValues,
		loginUser
	);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ display: "flex", flexDirection: "column" }}
		>
			{isServerError ? (
				<Alert severity="error">Unable to login.</Alert>
			) : (
				<>
					<br />
					<br />
				</>
			)}
			<Typography component={"h1"} variant="h5">
				Sign In
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
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleInputChange}
				variant="standard"
				margin="normal"
				required
			/>
			<Button type="submit" variant="contained" sx={{ my: 2 }}>
				Sign in
			</Button>
			<Grid container display={"flex"} justifyContent="center">
				<Grid item>
					<Link component={RouterLink} to="/register" underline="hover">
						Don't have an account? Sign up
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SignInForm;
