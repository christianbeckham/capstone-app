import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";

const AccountMenuButton = () => {
	const { logoutUser, user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			sx={{ mt: "45px", zIndex: 2000 }}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
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
					// mt: 1.5,
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
			<MenuItem onClick={() => navigate("/dashboard")}>
				<Avatar />
				Profile
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

	return (
		<Box>
			{user ? (
				<Chip
					icon={<AccountCircle />}
					onClick={handleProfileMenuOpen}
					label={user.username}
					color="primary"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
				/>
			) : (
				<Chip
					icon={<AccountCircle />}
					label="Sign in"
					color="primary"
					onClick={() => navigate("/login")}
					aria-label="user sign in"
				/>
			)}
			{renderMenu}
		</Box>
	);
};

export default AccountMenuButton;
