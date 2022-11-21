import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WifiTethering from "@mui/icons-material/WifiTethering";

const Navbar = () => {
	const { logoutUser, user } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1, margin: 0 }}>
			<AppBar position="static">
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
						<Button
							color="inherit"
							onClick={logoutUser}
							startIcon={
								<Avatar sx={{ width: 24, height: 24, bgcolor: "green" }}>
									{user.username[0]}
								</Avatar>
							}
						>
							Logout
						</Button>
					) : (
						<Button
							onClick={() => navigate("/login")}
							color="inherit"
							startIcon={<AccountCircle />}
						>
							Sign in
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
