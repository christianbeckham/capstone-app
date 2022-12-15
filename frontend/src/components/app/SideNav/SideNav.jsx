import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import useSettings from "../../../hooks/useSettings";
import useResponsive from "../../../hooks/useResponsive";
import SideNavItems from "../SideNavItems/SideNavItems";

const SideNav = ({ navItems }) => {
	const { collapsed, openMobileMenu, toggleMobileMenu } = useSettings();
	const width = collapsed ? 100 : 280;
	const isDesktop = useResponsive("up", "lg");

	return (
		<Box
			component="nav"
			aria-label="Navigation panel"
			sx={{
				width: { lg: width },
				flexShrink: { lg: 0 },
			}}
		>
			{isDesktop ? (
				<Drawer
					variant="permanent"
					open
					PaperProps={{
						sx: { width: width },
					}}
					data-test="permanent-side-nav"
				>
					<SideNavItems navItems={navItems} collapsed={collapsed} />
				</Drawer>
			) : (
				<Drawer
					variant="temporary"
					open={openMobileMenu}
					onClose={toggleMobileMenu}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: { width: width },
					}}
				>
					<SideNavItems navItems={navItems} collapsed={collapsed} />
				</Drawer>
			)}
		</Box>
	);
};

export default SideNav;
