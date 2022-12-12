import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";

const DashboardPage = () => {
	const { token } = useAuth();
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
		<>
			<PageAppBar pageTitle={"Admin Dashboard"} />
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Card sx={{ height: "100%" }}>
						<CardHeader title={"Client Overview"} />
						<CardContent>
							<Stack spacing={2}>
								<Box>
									<Stack direction="row" justifyContent={"space-between"}>
										<Typography
											component="h3"
											variant="body1"
											color="text.secondary"
										>
											Total
										</Typography>
										<Chip label={totalClients.total} color="primary" />
									</Stack>
								</Box>
								<Box>
									<Stack direction="row" justifyContent={"space-between"}>
										<Typography
											component="h3"
											variant="body1"
											color="text.secondary"
										>
											Active
										</Typography>
										<Chip label={totalClients.active} color="success" />
									</Stack>
								</Box>
								<Box>
									<Stack direction="row" justifyContent={"space-between"}>
										<Typography
											component="h3"
											variant="body1"
											color="text.secondary"
										>
											Inactive
										</Typography>
										<Chip label={totalClients.inactive} color="warning" />
									</Stack>
								</Box>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={8}>
					<Card sx={{ height: "100%" }}>
						<Stack direction="row" justifyContent={"space-between"}>
							<CardHeader title={"Latest Check-Ins"} />
							<Button
								component={Link}
								to={"checkins"}
								sx={{ display: "flex", alignItems: "center" }}
							>
								All
							</Button>
						</Stack>
						<CardContent>
							{latestCheckins.length > 0 &&
								latestCheckins.map((c) => (
									<Paper
										key={c.id}
										sx={{ my: 1.5, py: 1, px: 2, width: "100%" }}
									>
										<Stack
											direction="row"
											columnGap={1}
											justifyContent="space-between"
										>
											<Box>
												<Typography component="h3" variant="body1">
													By {c.user.full_name}
												</Typography>
												<Typography variant="caption" color="text.secondary">
													on {new Date(c?.created_date).toLocaleDateString()}
												</Typography>
											</Box>
											<IconButton
												component={Link}
												to={`checkins/${c.id}`}
												aria-label="view check-in"
												color="primary"
											>
												<ExitToApp />
											</IconButton>
										</Stack>
									</Paper>
								))}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default DashboardPage;
