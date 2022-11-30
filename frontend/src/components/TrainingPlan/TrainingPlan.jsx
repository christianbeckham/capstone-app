import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useAuth from "../../hooks/useAuth";

const TrainingPlan = () => {
	const [user, token] = useAuth();
	const [plan, setPlan] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/plans/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.status === 200) {
					const data = await response.data;
					setPlan(data[0]);
				}
			} catch (e) {
				console.log({ error: e.message });
			}
		};

		fetchData();
	}, []);

	return (
		<Card sx={{ display: "flex", width: "max-content" }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						Your Plan
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Goal: {plan.goal}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Days: {plan.weekly_workout_days}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Cost: ${plan.cost}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default TrainingPlan;
