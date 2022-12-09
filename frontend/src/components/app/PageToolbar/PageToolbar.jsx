import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AccountMenuButton from "../AccountMenuButton/AccountMenuButton";

const PageToolbar = ({ children, pageTitle }) => {
	return (
		<Box>
			<AppBar
				color="transparent"
				position="fixed"
				sx={{ width: `calc(100% - ${280}px)` }}
			>
				<Toolbar sx={{ height: 100, mx: 3 }}>
					<Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
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
