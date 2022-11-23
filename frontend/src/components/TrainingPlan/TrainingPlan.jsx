import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useAuth from "../../hooks/useAuth";

const TrainingPlan = ({ token }) => {
	// const [user, token] = useAuth();
	const [plan, setPlan] = useState({});

	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/plans/", {
					signal: abortController.signal,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				setPlan(data[0]);
			} catch (e) {
				if (e.name === "AbortError") return;
				console.log({ error: e.message });
			}
		};

		fetchData();
		return () => abortController.abort();
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
