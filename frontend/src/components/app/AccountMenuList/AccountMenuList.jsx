import React from "react";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import useAuth from "../../../hooks/useAuth";

const AccountMenuList = ({ menuId, menuAnchor, handleMenuClose }) => {
	const navigate = useNavigate();
	const { urlPrefix, logoutUser } = useAuth();
	const isMenuOpen = Boolean(menuAnchor);

	return (
		<Menu
			id={menuId}
			open={isMenuOpen}
			onClose={handleMenuClose}
			anchorEl={menuAnchor}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			sx={{ mt: 1 }}
			PaperProps={{
				elevation: 0,
				sx: {
					width: 160,
					px: 1,
					overflow: "visible",
					filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.25))",
					"& .MuiMenuItem-root": {
						typography: "body2",
						borderRadius: 1,
					},
					"&:before": {
						content: '""',
						display: "block",
						position: "absolute",
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: "background.paper",
						transform: "translateY(-50%) rotate(45deg)",
						zIndex: 0,
					},
				},
			}}
		>
			<MenuItem onClick={() => navigate(`/${urlPrefix}/profile`)}>
				<ListItemIcon>
					<AccountCircle />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem onClick={() => navigate(`/${urlPrefix}/settings`)}>
				<ListItemIcon>
					<Settings />
				</ListItemIcon>
				Settings
			</MenuItem>
			<Divider />
			<MenuItem onClick={logoutUser}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);
};

export default AccountMenuList;
