import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

import useAuth from "../../hooks/useAuth";
import UserChart from "../../components/user/UserChart/UserChart";

const MyOverview = () => {
	const [user, token] = useAuth();
	const [userInfo, setUserInfo] = useState(null);
	const [userCheckIns, setUserCheckIns] = useState([]);

	useEffect(() => {
		fetchUserInfo();
		fetchCheckIns();
	}, []);

	const fetchUserInfo = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/auth/me/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setUserInfo(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCheckIns = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/checkins/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setUserCheckIns(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid container item xs={12} sx={{ mb: 0 }}>
				<Card sx={{ width: "100%", p: 2 }}>
					<Typography component="h1" variant="h4">
						Welcome, {user && user.first_name}!
					</Typography>
				</Card>
			</Grid>
			<Grid container item xs={12} spacing={2}>
				<Grid item xs={4}>
					<Card sx={{ p: 2 }}>
						<Stack rowGap={4}>
							<Box>
								<Typography variant="h6" color="text.primary">
									My Macros
								</Typography>
								<Divider />
								<Stack direction={"row"} spacing={2} sx={{ my: 2 }}>
									<Box sx={{ position: "relative", display: "flex" }}>
										<CircularProgress
											variant="determinate"
											size="5rem"
											thickness={3}
											value={100}
										/>
										<Box
											sx={{
												top: 0,
												left: 0,
												bottom: 0,
												right: 0,
												position: "absolute",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Stack alignItems={"center"}>
												<Typography
													variant="body1"
													component="div"
													color="text.secondary"
												>
													2,400
												</Typography>
												<Typography
													variant="caption"
													component="div"
													color="text.secondary"
												>
													calories
												</Typography>
											</Stack>
										</Box>
									</Box>
									<Box sx={{ position: "relative", display: "flex" }}>
										<CircularProgress
											variant="determinate"
											size="5rem"
											thickness={3}
											value={100}
										/>
										<Box
											sx={{
												top: 0,
												left: 0,
												bottom: 0,
												right: 0,
												position: "absolute",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Stack alignItems={"center"}>
												<Typography
													variant="body1"
													component="div"
													color="text.secondary"
												>
													120g
												</Typography>
												<Typography
													variant="caption"
													component="div"
													color="text.secondary"
												>
													protein
												</Typography>
											</Stack>
										</Box>
									</Box>
									<Box sx={{ position: "relative", display: "flex" }}>
										<CircularProgress
											variant="determinate"
											size="5rem"
											thickness={3}
											value={100}
										/>
										<Box
											sx={{
												top: 0,
												left: 0,
												bottom: 0,
												right: 0,
												position: "absolute",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Stack alignItems={"center"}>
												<Typography
													variant="body1"
													component="div"
													color="text.secondary"
												>
													185g
												</Typography>
												<Typography
													variant="caption"
													component="div"
													color="text.secondary"
												>
													carbs
												</Typography>
											</Stack>
										</Box>
									</Box>
									<Box sx={{ position: "relative", display: "flex" }}>
										<CircularProgress
											variant="determinate"
											size="5rem"
											thickness={3}
											value={100}
										/>
										<Box
											sx={{
												top: 0,
												left: 0,
												bottom: 0,
												right: 0,
												position: "absolute",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Stack alignItems={"center"}>
												<Typography
													variant="body1"
													component="div"
													color="text.secondary"
												>
													70g
												</Typography>
												<Typography
													variant="caption"
													component="div"
													color="text.secondary"
												>
													fats
												</Typography>
											</Stack>
										</Box>
									</Box>
								</Stack>
							</Box>
							<Box>
								<Typography variant="h6" color="text.primary">
									My Profile
								</Typography>
								<Divider />
								<Stack spacing={1} sx={{ my: 2 }}>
									<Typography variant="body2" color="text.secondary">
										Username: {userInfo?.username}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Email: {userInfo?.email}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Date Joined:{" "}
										{new Date(userInfo?.date_joined).toLocaleDateString()}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										component="div"
									>
										Status:
										<Chip
											label={userInfo?.is_client ? "Active" : "Inactive"}
											size="small"
											color={userInfo?.is_client ? "success" : "warning"}
											sx={{ mx: 1 }}
										/>
									</Typography>
								</Stack>
							</Box>
							<Box>
								<Typography variant="h6" color="text.primary">
									My Training Plan
								</Typography>
								<Divider />
								<Stack spacing={1} sx={{ my: 2 }}>
									<Typography variant="body2" color="text.secondary">
										Goal: {userInfo?.training_plan.goal}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Cost: {userInfo?.training_plan.cost}
									</Typography>
								</Stack>
							</Box>
						</Stack>
					</Card>
				</Grid>
				<Grid item xs={8}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<UserChart userCheckIns={userCheckIns} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MyOverview;
