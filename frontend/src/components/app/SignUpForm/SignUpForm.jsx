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

const SignUpForm = () => {
	const navigate = useNavigate();
	const { registerUser, isServerError, setIsServerError, isLoading } =
		useAuth();
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleSignInLink = () => {
		setIsServerError(false);
		setOpen(false);
		navigate("/login");
	};

	const handleClose = () => {
		setIsServerError(false);
		setOpen(false);
	};

	useEffect(() => {
		if (isServerError) setOpen(true);
	}, [isServerError]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={5000}
				open={open}
				onClose={handleClose}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: "100%" }}
					onClose={handleClose}
				>
					Unable to register.
				</Alert>
			</Snackbar>

			<Stack spacing={1}>
				<Typography component={"h1"} variant="h4">
					Sign Up
				</Typography>
				<Stack direction="row" spacing={1}>
					<Typography variant="body2">Already have an account? {""}</Typography>
					<Link
						component="button"
						onClick={handleSignInLink}
						variant="subtitle2"
						underline="hover"
					>
						Sign in
					</Link>
				</Stack>
			</Stack>

			<Box component="form" onSubmit={handleSubmit} sx={{ my: 2 }}>
				<Stack direction="row" columnGap={2}>
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
				</Stack>
				<Stack>
					<TextField
						label="Username"
						type="text"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
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
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										size="small"
									>
										{showPassword ? (
											<Visibility fontSize="inherit" />
										) : (
											<VisibilityOff fontSize="inherit" />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<Button
					type="submit"
					variant="contained"
					startIcon={isLoading && <CircularProgress color="common" size={20} />}
					fullWidth
					sx={{ my: 2 }}
				>
					Sign up
				</Button>
				<Typography
					component={"div"}
					variant="caption"
					sx={{ textAlign: "center" }}
				>
					By signing up, I agree to <Link>Terms of Service</Link> and{" "}
					<Link>Privacy Policy</Link>.
				</Typography>
			</Box>
		</Box>
	);
};

export default SignUpForm;
