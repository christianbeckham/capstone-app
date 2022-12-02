import React from "react";
import Container from "@mui/material/Container";
import SignInForm from "../../components/app/SignInForm/SignInForm";

const LoginPage = () => {
	return (
		<Container component={"main"} maxWidth="xs">
			<br />
			<br />
			<SignInForm />
		</Container>
	);
};

export default LoginPage;
