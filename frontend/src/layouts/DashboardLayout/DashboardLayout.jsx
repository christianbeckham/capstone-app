import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardNav from "../../components/DashboardNav/DashboardNav";

const DashboardLayout = ({ children }) => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<DashboardNav />
			<Stack component="main" sx={{ flexGrow: 1, p: 3 }} spacing={2}>
				{children}
			</Stack>
		</Box>
	);
};

export default DashboardLayout;
