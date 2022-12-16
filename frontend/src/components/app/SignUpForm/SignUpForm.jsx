import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import East from "@mui/icons-material/East";
import Check from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useAuth from "../../../hooks/useAuth";
import { checkEmail } from "../../../utils/emailCheck";

const defaultValues = {
	username: "",
	password: "",
	firstName: "",
	lastName: "",
};

const SignUpForm = () => {
	const navigate = useNavigate();
	const { registerUser, isServerError, setIsServerError, isLoading } = useAuth();
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [usernameIsValid, setUsernameIsValid] = useState(false);
	const [formData, setFormData] = useState(defaultValues);
	const [continueRegister, setContinueRegister] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleInputChange = (e) => {
		e.persist();
		const name = e.target.name;
		const value = e.target.value;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleContinueRegister = () => {
		if (emailIsValid && formData?.email?.length > 0) setContinueRegister(true);
	};

	const handleClose = () => {
		setIsServerError(false);
		setOpen(false);
	};

	const handleSignInLink = () => {
		handleClose();
		setFormData(defaultValues);
		navigate("/");
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log("Final Data", formData);
		registerUser(formData);
		setFormData(defaultValues);
	};

	const checkUserValidity = async (param, value, stateFunc) => {
		try {
			const response = await axios.get(`http://localhost:8000/api/auth/user_validity/?${param}=${value}`);
			if (response.status === 200) {
				console.log("Validity API call for", param, response.data);
				stateFunc(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (formData?.email?.length > 0) {
			const validEmail = checkEmail(formData?.email);
			if (validEmail === true) {
				checkUserValidity("email", formData?.email, setEmailIsValid);
			} else {
				setEmailIsValid(false);
			}
		} else {
			setEmailIsValid(false);
		}
	}, [formData?.email]);

	useEffect(() => {
		if (formData?.username?.length > 0) {
			checkUserValidity("username", formData?.username, setUsernameIsValid);
		} else {
			setUsernameIsValid(false);
		}
	}, [formData?.username]);

	useEffect(() => {
		if (isServerError) setOpen(true);
	}, [isServerError]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={5000}
				open={open}
				onClose={handleClose}
			>
				<Alert severity="error" variant="filled" sx={{ width: "100%" }} onClose={handleClose}>
					Unable to register
				</Alert>
			</Snackbar>

			<Stack spacing={1}>
				<Typography component={"h1"} variant="h4">
					Sign Up
				</Typography>
				<Stack direction="row" spacing={1}>
					<Typography variant="body2">Already have an account? {""}</Typography>
					<Link component="button" onClick={handleSignInLink} variant="subtitle2" underline="hover">
						Sign in
					</Link>
				</Stack>
			</Stack>

			<Box component="form" onSubmit={handleFormSubmit} sx={{ my: 2 }}>
				<Stack direction={"row"} columnGap={2} sx={{ mb: 5 }}>
					<TextField
						label="First Name"
						type="text"
						name="firstName"
						value={formData?.firstName}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						fullWidth
					/>
					<TextField
						label="Last Name"
						type="text"
						name="lastName"
						value={formData?.lastName}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						fullWidth
					/>
				</Stack>
				<Stack direction={"row"} spacing={1} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<FormControl required variant="standard" fullWidth>
						<InputLabel htmlFor="email-input">Email</InputLabel>
						<Input
							id="email-input"
							error={formData?.email?.length > 0 && !emailIsValid}
							name="email"
							value={formData?.email || ""}
							onChange={handleInputChange}
							startAdornment={
								<InputAdornment position="start">
									<Check color={`${emailIsValid ? "success" : formData?.email?.length ? "error" : "inherit"}`} />
								</InputAdornment>
							}
						/>
						<FormHelperText error={false}>
							{formData?.email?.length > 0 && !emailIsValid ? "Email is invalid or already taken" : " "}
						</FormHelperText>
					</FormControl>
					<IconButton
						size="small"
						disabled={!emailIsValid}
						onClick={handleContinueRegister}
						sx={{ bgcolor: `${emailIsValid ? "background.neutral" : "inherit"}`, color: "#fff" }}
					>
						<East fontSize="inheri" />
					</IconButton>
				</Stack>

				<Stack columnGap={2} sx={{ visibility: `${continueRegister ? "visible" : "hidden"}` }}>
					<FormControl required disabled={!emailIsValid} focused={continueRegister} variant="standard" fullWidth>
						<InputLabel htmlFor="username-input">Username</InputLabel>
						<Input
							id="username-input"
							error={formData?.username?.length > 0 && !usernameIsValid}
							name="username"
							value={formData?.username || ""}
							onChange={handleInputChange}
							startAdornment={
								<InputAdornment position="start">
									<Check color={`${usernameIsValid ? "success" : formData?.username?.length ? "error" : "inherit"}`} />
								</InputAdornment>
							}
						/>
						<FormHelperText error={false}>
							{formData?.username?.length > 0 && !usernameIsValid ? "Username is invalid or already taken" : " "}
						</FormHelperText>
					</FormControl>
					<TextField
						disabled={!usernameIsValid}
						label="Password"
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						helperText={"Password is visible"}
						sx={{
							"& .MuiFormHelperText-root": {
								visibility: `${showPassword ? "visible" : "hidden"}`,
								color: "error.main",
							},
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} size="small">
										{showPassword ? <Visibility fontSize="inherit" /> : <VisibilityOff fontSize="inherit" />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<Button
					disabled={!formData?.password?.length}
					type="submit"
					variant="contained"
					startIcon={isLoading && <CircularProgress color="common" size={20} />}
					fullWidth
					sx={{ my: 2 }}
				>
					Sign up
				</Button>
				<Typography component={"div"} variant="caption" sx={{ textAlign: "center" }}>
					By signing up, I agree to <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
				</Typography>
			</Box>
		</Box>
	);
};

export default SignUpForm;
