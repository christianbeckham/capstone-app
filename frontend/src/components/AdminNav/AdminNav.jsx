import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import People from "@mui/icons-material/People";
import Grading from "@mui/icons-material/Grading";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import Logout from "@mui/icons-material/Logout";

import AuthContext from "../../context/AuthContext";

const AdminNav = () => {
	const { logoutUser } = useContext(AuthContext);

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
				<List
					subheader={
						<ListSubheader component="h1" id="admin-list-subheader">
							ADMIN
							<Divider />
						</ListSubheader>
					}
				>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/admin">
							<ListItemIcon>
								<AdminPanelSettings />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="clients">
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary={"Clients"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="checkins">
							<ListItemIcon>
								<Grading />
							</ListItemIcon>
							<ListItemText primary={"Check-Ins"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="requests">
							<ListItemIcon>
								<QuestionAnswer />
							</ListItemIcon>
							<ListItemText primary={"Requests"} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
			<Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
				<ListItem disablePadding>
					<ListItemButton sx={{ py: 1 }} onClick={logoutUser}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<ListItemText primary={"Logout"} />
					</ListItemButton>
				</ListItem>
			</Box>
		</Drawer>
	);
};

export default AdminNav;
