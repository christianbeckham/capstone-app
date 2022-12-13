import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import UserChart from "../../../components/user/UserChart/UserChart";
import MacrosCard from "../../../components/user/MacrosCard/MacrosCard";

const DashboardPage = () => {
	const { user, token } = useAuth();
	const [userInfo, setUserInfo] = useState(null);
	const [userCheckIns, setUserCheckIns] = useState([]);

	useEffect(() => {
		fetchUserInfo();
		fetchCheckIns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchUserInfo = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/auth/me/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				console.log(response.data);
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
			<PageToolbar pageTitle={"Dashboard"} />
			<Grid container item xs={12} sx={{ mb: 0 }}>
				<Card sx={{ width: "100%" }}>
					<CardHeader title={`Welcome, ${user && user.first_name}!`} />
				</Card>
			</Grid>
			<Grid container item xs={12} spacing={2}>
				<Grid item xs={4}>
					<Stack spacing={2}>
						<MacrosCard plan={userInfo?.training_plan} />
						<Card>
							<CardHeader title={"My Training Plan"} />
							<CardContent>
								<Box>
									{userInfo?.training_plan?.goal ? (
										<Typography variant="body1" color="text.secondary">
											{userInfo?.training_plan?.goal}
										</Typography>
									) : (
										<Typography variant="body1" color="text.secondary">
											In progress
										</Typography>
									)}
								</Box>
							</CardContent>
						</Card>
					</Stack>
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

export default DashboardPage;
