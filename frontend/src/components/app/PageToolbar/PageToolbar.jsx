import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import useSettings from "../../../hooks/useSettings";
import AccountMenuButton from "../AccountMenuButton/AccountMenuButton";

const PageToolbar = ({ children, pageTitle }) => {
	const { collapsed } = useSettings();
	const width = collapsed ? 100 : 280;
	return (
		<Box>
			<AppBar
				color="transparent"
				position="fixed"
				sx={{ width: `calc(100% - ${width}px)` }}
			>
				<Toolbar sx={{ height: 100, mx: 3 }}>
					<Typography component="h1" variant="h3" sx={{ flexGrow: 1 }}>
						{pageTitle}
					</Typography>
					{children}
					<AccountMenuButton />
				</Toolbar>
			</AppBar>
			<Toolbar sx={{ height: 100 }} />
		</Box>
	);
};

export default PageToolbar;
