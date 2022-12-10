import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import AuthContext from "../../../context/AuthContext";

const AccountMenuList = ({ menuId, menuAnchor, handleMenuClose }) => {
	const navigate = useNavigate();
	const { logoutUser } = useContext(AuthContext);
	const isMenuOpen = Boolean(menuAnchor);

	return (
		<Menu
			sx={{ mt: "45px", zIndex: 2000 }}
			anchorEl={menuAnchor}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: "visible",
					filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					"& .MuiAvatar-root": {
						width: 24,
						height: 24,
						ml: -0.5,
						mr: 1,
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
			<MenuItem onClick={() => navigate("/profile")}>
				<ListItemIcon>
					<AccountCircle />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem onClick={() => navigate("/settings")}>
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
