import React from "react";
import { useNavigate } from "react-router-dom";

import Chip from "@mui/material/Chip";
import AccountCircle from "@mui/icons-material/AccountCircle";

const PublicSignInButton = () => {
	const navigate = useNavigate();
	return (
		<Chip
			icon={<AccountCircle />}
			label="Sign in"
			color="primary"
			onClick={() => navigate("/login")}
			aria-label="user sign in"
		/>
	);
};

export default PublicSignInButton;
