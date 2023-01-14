import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Grid,
	Box,
	Stack,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Button,
	IconButton,
	CircularProgress,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
import ExitToApp from "@mui/icons-material/ExitToApp";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import InfoRing from "../../../components/app/InfoRing/InfoRing";

const DashboardPage = () => {
	const { token } = useAuth();
	const [totalClients, setTotalClients] = useState({});
	const [latestCheckins, setLatestCheckins] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchClients = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/auth/clients/total/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setTotalClients(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchLatestCheckins = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/all/?limit=5`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setLatestCheckins(response.data);
				setLoading(false);
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
							<Stack direction="row" alignItems={"center"} justifyContent={"space-around"}>
								<InfoRing text={"Total"} value={totalClients?.total} />
								<InfoRing text={"Active"} value={totalClients?.active} />
								<InfoRing text={"Inactive"} value={totalClients?.inactive} />
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={8}>
					<Card>
						{loading ? (
							<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
								<CircularProgress disableShrink />
							</Box>
						) : (
							<>
								<Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
									<CardHeader title={"Latest Check-Ins"} />
									<Button component={Link} to={"checkins"} size="small" sx={{ display: "flex", alignItems: "center" }}>
										All
									</Button>
								</Stack>
								<Box>
									{latestCheckins.length > 0 ? (
										<Table>
											<TableBody>
												{latestCheckins.map((c) => (
													<TableRow key={c.id} hover={true}>
														<TableCell>{new Date(c?.created_date).toLocaleDateString()}</TableCell>
														<TableCell sx={{ width: "100%" }}>{c.user.full_name}</TableCell>
														<TableCell>
															<IconButton
																component={Link}
																to={`checkins/${c.id}`}
																aria-label="view check-in"
																color="primary"
																sx={{ display: "inline-flex" }}
															>
																<ExitToApp />
															</IconButton>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									) : (
										<Box sx={{ m: 1 }}>
											<Typography>No check-ins available</Typography>
										</Box>
									)}
								</Box>
							</>
						)}
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default DashboardPage;
