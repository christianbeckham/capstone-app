import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dashboard from "@mui/icons-material/Dashboard";
import FactCheck from "@mui/icons-material/FactCheck";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import HelpCenter from "@mui/icons-material/HelpCenter";

const DashboardNav = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 240,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: 240,
					boxSizing: "border-box",
				},
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/dashboard">
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/checkins">
							<ListItemIcon>
								<FactCheck />
							</ListItemIcon>
							<ListItemText primary={"Check-Ins"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/workouts">
							<ListItemIcon>
								<FitnessCenter />
							</ListItemIcon>
							<ListItemText primary={"Workouts"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/requests">
							<ListItemIcon>
								<HelpCenter />
							</ListItemIcon>
							<ListItemText primary={"Requests"} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default DashboardNav;
