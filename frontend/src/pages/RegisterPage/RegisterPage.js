import React from "react";
import Container from "@mui/material/Container";
import SignUpForm from "../../components/app/SignUpForm/SignUpForm";

const RegisterPage = () => {
	return (
		<Container component={"main"} maxWidth="xs">
			<br />
			<br />
			<SignUpForm />
		</Container>
	);
};

export default RegisterPage;
