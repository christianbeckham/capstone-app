import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WifiTethering from "@mui/icons-material/WifiTethering";

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
		>
			<MenuItem onClick={() => navigate("dashboard")}>Dashboard</MenuItem>
			<MenuItem onClick={() => navigate("/")}>Account</MenuItem>
			<MenuItem onClick={logoutUser}>Logout</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1, margin: 0 }}>
			<AppBar position="relative" sx={{ zIndex: 1500 }}>
				<Toolbar>
					<WifiTethering sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							width: 100,
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							flexGrow: 1,
						}}
					>
						FitHub
					</Typography>
					{user ? (
						<Chip
							icon={<AccountCircle />}
							onClick={handleProfileMenuOpen}
							label={user.username}
							color="primary"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							sx={{ bgcolor: "ButtonShadow" }}
						/>
					) : (
						<Chip
							icon={<AccountCircle />}
							label="Sign in"
							color="primary"
							sx={{ bgcolor: "ButtonShadow" }}
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
