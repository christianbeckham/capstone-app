import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import PublicNavbar from "../../../components/app/PublicNavbar/PublicNavbar";
import ThemeToggle from "../../../components/app/ThemeToggle/ThemeToggle";
import SignInForm from "../../../components/app/SignInForm/SignInForm";

const HomePage = () => {
	return (
		<>
			<PublicNavbar>
				<ThemeToggle />
			</PublicNavbar>
			<Grid
				container
				component="main"
				maxWidth={"xl"}
				sx={{
					height: "100vh",
					m: "auto",
				}}
			>
				<Grid
					item
					xs={12}
					sm={4}
					md={6}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Container component="section" maxWidth="md" sx={{ textAlign: "center" }}>
						<Typography component="h1" variant="h2">
							Welcome to FitHub
						</Typography>
					</Container>
				</Grid>
				<Divider
					orientation="vertical"
					variant="middle"
					flexItem
					sx={{
						display: { xs: "none", md: "flex" },
						m: "auto",
						height: "70%",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Container component="section" maxWidth="sm">
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<SignInForm />
						</Box>
					</Container>
				</Grid>
			</Grid>
		</>
	);
};

export default HomePage;
