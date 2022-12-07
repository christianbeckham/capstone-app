import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WifiTethering from "@mui/icons-material/WifiTethering";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
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
			<MenuItem onClick={() => navigate("dashboard")}>
				<Avatar />
				Dashboard
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
		<Box sx={{ flexGrow: 1, margin: 0 }}>
			<AppBar position="relative" sx={{ zIndex: 1500 }}>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<WifiTethering
							sx={{ display: { xs: "none", md: "flex" }, mx: 1 }}
						/>
						<Typography
							variant="h5"
							noWrap
							component={Link}
							to="/"
							sx={{
								width: "100%",
								display: { xs: "none", md: "flex" },
								color: "inherit",
								textDecoration: "none",
								flexGrow: 1,
								ml: 1,
								mr: 2,
							}}
						>
							FitHub
						</Typography>
					</Box>
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
				</Toolbar>
			</AppBar>
			{renderMenu}
		</Box>
	);
};

export default Navbar;
