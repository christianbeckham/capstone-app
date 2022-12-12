import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import OfflineBolt from "@mui/icons-material/OfflineBolt";

import AccountBadge from "../AccountBadge/AccountBadge";

const SideNavItems = ({ navItems, collapsed }) => {
	return (
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
				<OfflineBolt sx={{ fontSize: 48 }} />
			</Box>
			{!collapsed && <AccountBadge />}
			<Box sx={{ px: 2 }}>
				<List component="nav">
					{navItems.map((i, index) => (
						<ListItem key={index}>
							<Tooltip title={collapsed ? i.key : ""} placement="right" arrow>
								<ListItemButton
									component={RouterLink}
									to={i.path}
									sx={{
										"&.active": {
											color: "text.primary",
											bgcolor: "background.neutral",
										},
									}}
									end
								>
									<ListItemIcon>
										<i.icon />
									</ListItemIcon>
									<ListItemText
										primary={i.key}
										disableTypography
										sx={{ opacity: !collapsed ? 1 : 0 }}
									/>
								</ListItemButton>
							</Tooltip>
						</ListItem>
					))}
				</List>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
		</Box>
	);
};

export default SideNavItems;
