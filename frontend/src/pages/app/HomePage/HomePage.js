import React from "react";

import Container from "@mui/material/Container";

import PublicNavbar from "../../../components/app/PublicNavbar/PublicNavbar";
import PublicSignInButton from "../../../components/app/PublicSignInButton/PublicSignInButton";

const HomePage = () => {
	return (
		<>
			<PublicNavbar>
				<PublicSignInButton />
			</PublicNavbar>
			<Container
				maxWidth="lg"
				sx={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h1>Home page</h1>
			</Container>
		</>
	);
};

export default HomePage;
