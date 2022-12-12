import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Logo from "../Logo/Logo";

const PublicNavbar = ({ children }) => {
	return (
		<AppBar position="fixed">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Logo />
				{children}
			</Toolbar>
		</AppBar>
	);
};

export default PublicNavbar;
