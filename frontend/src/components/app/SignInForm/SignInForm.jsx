import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useAuth from "../../../hooks/useAuth";
import useCustomForm from "../../../hooks/useCustomForm";

const SignInForm = () => {
	const navigate = useNavigate();
	const { loginUser, isServerError, setIsServerError, isLoading } = useAuth();
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const defaultValues = { username: "", password: "" };
	const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, loginUser);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleRegisterLink = () => {
		setIsServerError(false);
		setOpen(false);
		navigate("/register");
	};

	const handleClose = () => {
		setIsServerError(false);
		setOpen(false);
	};

	useEffect(() => {
		if (isServerError) setOpen(true);
	}, [isServerError]);

	return (
		<Box sx={{ width: "100%" }}>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={5000}
				open={open}
				onClose={handleClose}
			>
				<Alert severity="error" variant="filled" sx={{ width: "100%" }} onClose={handleClose}>
					Unable to login
				</Alert>
			</Snackbar>
			<Box component="form" onSubmit={handleSubmit}>
				<Typography component={"h1"} variant="h4" gutterBottom>
					Sign In
				</Typography>
				<Stack spacing={2}>
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
						data-test="username-input"
					/>
					<TextField
						label="Password"
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						helperText={showPassword ? "Password is visible" : " "}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} size="small">
										{showPassword ? <Visibility fontSize="inherit" /> : <VisibilityOff fontSize="inherit" />}
									</IconButton>
								</InputAdornment>
							),
						}}
						data-test="password-input"
					/>
				</Stack>
				<Stack>
					<Button
						type="submit"
						variant="contained"
						startIcon={isLoading && <CircularProgress color="common" size={20} />}
						fullWidth
						sx={{ my: 2 }}
						data-test="signin-form-button"
					>
						Sign in
					</Button>
					<Stack direction="row" justifyContent="center" spacing={1}>
						<Typography variant="body2">Don’t have an account? {""}</Typography>
						<Link component="button" onClick={handleRegisterLink} variant="subtitle2" underline="hover">
							Sign up
						</Link>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
};

export default SignInForm;
