import React from "react";
import { useOutlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import SideNav from "../../components/app/SideNav/SideNav";
import { adminNavItems } from "../../routes/sideNavItems";

const AdminLayout = () => {
	const outlet = useOutlet();

	return (
		<Box sx={{ display: "flex" }}>
			<SideNav navItems={adminNavItems} />
			<Stack component="main" sx={{ flexGrow: 1, px: 6, height: "100vh" }}>
				{outlet}
			</Stack>
		</Box>
	);
};

export default AdminLayout;
