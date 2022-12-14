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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import InfoRing from "../../../components/app/InfoRing/InfoRing";

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<PageAppBar pageTitle={"Admin Dashboard"} />
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Card>
						<CardHeader title={"Client Overview"} />
						<CardContent>
							<Stack
								direction="row"
								alignItems={"center"}
								justifyContent={"space-around"}
							>
								<InfoRing text={"Total"} value={totalClients?.total} />
								<InfoRing text={"Active"} value={totalClients?.active} />
								<InfoRing text={"Inactive"} value={totalClients?.inactive} />
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={8}>
					<Card>
						<Stack
							direction="row"
							alignItems={"center"}
							justifyContent={"space-between"}
						>
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
							{latestCheckins.length > 0 ? (
								latestCheckins.map((c) => (
									<Paper
										key={c.id}
										sx={{ my: 1.5, py: 1, px: 2, width: "100%" }}
									>
										<Stack
											direction="row"
											columnGap={1}
											alignItems={"center"}
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
												sx={{ display: "inline-flex" }}
											>
												<ExitToApp />
											</IconButton>
										</Stack>
									</Paper>
								))
							) : (
								<Box sx={{ m: 1 }}>
									<Typography>No check-ins available</Typography>
								</Box>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default DashboardPage;
