import React from "react";
import { useOutlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";

import AdminNav from "../../components/admin/AdminNav/AdminNav";

const AdminLayout = () => {
	const outlet = useOutlet();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AdminNav />
			<Stack component="main" sx={{ flexGrow: 1, p: 3 }} spacing={2}>
				{outlet}
			</Stack>
		</Box>
	);
};

export default AdminLayout;
