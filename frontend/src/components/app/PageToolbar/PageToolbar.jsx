import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";

import useSettings from "../../../hooks/useSettings";
import AccountMenuButton from "../AccountMenuButton/AccountMenuButton";

const PageToolbar = ({ children, pageTitle }) => {
	const { collapsed, toggleMobileMenu } = useSettings();
	const width = collapsed ? 100 : 280;
	return (
		<Box>
			<AppBar
				color="default"
				position="fixed"
				sx={{
					width: { lg: `calc(100% - ${width}px)` },
					marginLeft: { lg: width },
				}}
			>
				<Toolbar sx={{ height: 100, mx: 3 }}>
					<IconButton
						color="inherit"
						aria-label="open mobile menu"
						edge="start"
						onClick={toggleMobileMenu}
						sx={{
							display: { lg: "none" },
							marginRight: 2,
						}}
					>
						<Menu />
					</IconButton>
					<Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
						<Typography component="h1" variant="h3">
							{pageTitle}
						</Typography>
						<Stack direction="row" alignItems="center" spacing={2}>
							{children}
						</Stack>
					</Stack>
					<AccountMenuButton />
				</Toolbar>
			</AppBar>
			<Toolbar sx={{ height: 100 }} />
		</Box>
	);
};

export default PageToolbar;
