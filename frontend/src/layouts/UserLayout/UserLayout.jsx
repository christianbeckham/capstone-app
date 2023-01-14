import React from "react";
import { useOutlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import SideNav from "../../components/app/SideNav/SideNav";
import { userNavItems } from "../../routes/sideNavItems";

const UserLayout = () => {
	const outlet = useOutlet();

	return (
		<Box sx={{ display: "flex" }}>
			<SideNav navItems={userNavItems} />
			<Stack component="main" sx={{ flexGrow: 1, px: 6, height: "100vh" }}>
				{outlet}
			</Stack>
		</Box>
	);
};

export default UserLayout;
