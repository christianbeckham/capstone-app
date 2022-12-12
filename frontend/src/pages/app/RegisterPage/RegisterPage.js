import React from "react";

import Container from "@mui/material/Container";

import PublicNavbar from "../../../components/app/PublicNavbar/PublicNavbar";
import SignUpForm from "../../../components/app/SignUpForm/SignUpForm";

const RegisterPage = () => {
	return (
		<>
			<PublicNavbar />
			<Container
				component={"main"}
				maxWidth="sm"
				sx={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SignUpForm />
			</Container>
		</>
	);
};

export default RegisterPage;
