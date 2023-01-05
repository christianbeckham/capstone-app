import React from "react";

import Container from "@mui/material/Container";

import PublicNavbar from "../../../components/app/PublicNavbar/PublicNavbar";
import ThemeToggle from "../../../components/app/ThemeToggle/ThemeToggle";
import SignInForm from "../../../components/app/SignInForm/SignInForm";

const LoginPage = () => {
	return (
		<>
			<PublicNavbar>
				<ThemeToggle />
			</PublicNavbar>
			<Container
				component={"main"}
				maxWidth="xs"
				sx={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SignInForm />
			</Container>
		</>
	);
};

export default LoginPage;
