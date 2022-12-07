import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import useAuth from "../../hooks/useAuth";
import { Button, Divider } from "@mui/material";

const AdminDashboard = () => {
	const [user, token] = useAuth();
	const [totalClients, setTotalClients] = useState({});
	const [latestCheckins, setLatestCheckins] = useState([]);

	const fetchClients = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/auth/clients/total/",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				setTotalClients(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchLatestCheckins = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/checkins/all/?limit=5",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log("latest checkins", response.data);
				setLatestCheckins(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClients();
		fetchLatestCheckins();
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box sx={{ width: "100%", p: 2 }}>
					<Typography component="h1" variant="h4">
						Welcome, {user.first_name} {user.last_name}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Stack rowGap={0}>
					<Typography
						component="h2"
						variant="overline"
						color="text.secondary"
						sx={{ fontSize: "1em" }}
					>
						Client Overview
					</Typography>
					<Divider />
					<Stack direction="row" columnGap={2} sx={{ my: 1.5 }}>
						<Card sx={{ p: 2 }}>
							<Stack direction="row" columnGap={2}>
								<Typography
									component="h2"
									variant="overline"
									color="text.secondary"
								>
									Total
								</Typography>
								<Chip label={totalClients.total} color="primary" />
							</Stack>
						</Card>
						<Card sx={{ p: 2 }}>
							<Stack direction="row" columnGap={2}>
								<Typography
									component="h2"
									variant="overline"
									color="text.secondary"
								>
									Active
								</Typography>
								<Chip label={totalClients.active} color="success" />
							</Stack>
						</Card>
						<Card sx={{ p: 2 }}>
							<Stack direction="row" columnGap={2}>
								<Typography
									component="h2"
									variant="overline"
									color="text.secondary"
								>
									Inactive
								</Typography>
								<Chip label={totalClients.inactive} color="warning" />
							</Stack>
						</Card>
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={8}>
				<Box sx={{ px: 2 }}>
					<Stack direction="row" justifyContent={"space-between"}>
						<Typography
							component="h2"
							variant="overline"
							color="text.secondary"
							sx={{ fontSize: "1em" }}
						>
							Latest Check-Ins
						</Typography>
						<Button
							component={Link}
							to={"checkins"}
							sx={{ display: "flex", alignItems: "center" }}
						>
							All
						</Button>
					</Stack>
					<Divider />
					{latestCheckins.length > 0 &&
						latestCheckins.map((c) => (
							<Paper key={c.id} sx={{ my: 1.5, py: 1, px: 2, width: "100%" }}>
								<Stack
									direction="row"
									columnGap={1}
									justifyContent="space-between"
								>
									<Box>
										<Typography component="h5" variant="body1">
											By {c.user.full_name}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											on {new Date(c?.created_date).toLocaleDateString()}
										</Typography>
									</Box>
									<Button component={Link} to={`checkins/${c.id}`}>
										view
									</Button>
								</Stack>
							</Paper>
						))}
				</Box>
			</Grid>
		</Grid>
	);
};

export default AdminDashboard;
