import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OfflineBolt from "@mui/icons-material/OfflineBolt";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";

import AuthContext from "../../../context/AuthContext";
import useSettings from "../../../hooks/useSettings";

const SideNav = ({ navItems, toggleSettingsPanel }) => {
	const { logoutUser } = useContext(AuthContext);
	const { collapsed } = useSettings();

	const width = collapsed ? 100 : 280;

	return (
		<Box
			component="nav"
			aria-label="Navigation panel"
			sx={{
				width: { lg: width },
				flexShrink: { lg: 0 },
			}}
		>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: "block",
					[`& .MuiDrawer-paper`]: {
						width: width,
						boxSizing: "border-box",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100%",
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							p: 4,
						}}
					>
						<OfflineBolt sx={{ fontSize: 56 }} />
					</Box>
					<List component="nav">
						{navItems.map((i, index) => (
							<ListItem key={index}>
								<ListItemButton component={NavLink} to={i.path}>
									<ListItemIcon>
										<i.icon />
									</ListItemIcon>
									<ListItemText
										primary={i.key}
										sx={{ opacity: !collapsed ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Box sx={{ flexGrow: 1 }} />
					<List component="nav">
						<ListItem>
							<ListItemButton onClick={toggleSettingsPanel}>
								<ListItemIcon>
									<Settings />
								</ListItemIcon>
								<ListItemText
									primary={"Settings"}
									sx={{ opacity: !collapsed ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton onClick={logoutUser}>
								<ListItemIcon>
									<Logout />
								</ListItemIcon>
								<ListItemText
									primary={"Logout"}
									sx={{ opacity: !collapsed ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default SideNav;
