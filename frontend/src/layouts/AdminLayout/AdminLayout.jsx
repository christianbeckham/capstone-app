import React, { useState } from "react";
import { useOutlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import SideNav from "../../components/app/SideNav/SideNav";
import SettingsPanel from "../../components/app/SettingsPanel/SettingsPanel";
import { adminNavItems } from "../../routes/sideNavItems";

const AdminLayout = () => {
	const outlet = useOutlet();
	const [openSettings, setOpenSettings] = useState(false);

	const handleSettingsToggle = () => setOpenSettings(!openSettings);

	return (
		<Box sx={{ display: "flex" }}>
			<SideNav
				navItems={adminNavItems}
				toggleSettingsPanel={handleSettingsToggle}
			/>
			<Stack component="main" sx={{ flexGrow: 1, px: 6 }}>
				{outlet}
			</Stack>
			<SettingsPanel
				open={openSettings}
				toggleSettingsPanel={handleSettingsToggle}
			/>
		</Box>
	);
};

export default AdminLayout;
