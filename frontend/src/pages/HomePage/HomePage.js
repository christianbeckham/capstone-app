import React from "react";
import Container from "@mui/material/Container";

const HomePage = () => {
	return (
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
	);
};

export default HomePage;
