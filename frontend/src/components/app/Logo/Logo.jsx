import React from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OfflineBolt from "@mui/icons-material/OfflineBolt";

const Logo = () => {
	const navigate = useNavigate();
	return (
		<IconButton
			onClick={() => navigate("/")}
			size="large"
			aria-label="site logo"
			color="inherit"
			disableRipple
		>
			<OfflineBolt fontSize="inherit" />
		</IconButton>
	);
};

export default Logo;
