import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccountCircle from "@mui/icons-material/AccountCircle";

import AuthContext from "../../../context/AuthContext";
import AccountMenuList from "../AccountMenuList/AccountMenuList";

const AccountMenuButton = () => {
	const { user } = useContext(AuthContext);
	const [menuAnchor, setMenuAnchor] = useState(null);
	const navigate = useNavigate();

	const menuId = "account-button-menu";
	const handleMenuClose = () => setMenuAnchor(null);
	const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);

	return (
		<Box>
			{user ? (
				<Chip
					icon={<AccountCircle />}
					onClick={handleMenuOpen}
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
			<AccountMenuList
				menuId={menuId}
				menuAnchor={menuAnchor}
				handleMenuClose={handleMenuClose}
			/>
		</Box>
	);
};

export default AccountMenuButton;
