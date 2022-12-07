import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import useAuth from "../../../hooks/useAuth";
import NewWorkoutForm from "../NewWorkoutForm/NewWorkoutForm";
import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

const ProfileWorkoutList = ({ planId }) => {
	const [user, token] = useAuth();
	const [workouts, setWorkouts] = useState([]);

	const fetchWorkoutsByPlan = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/workouts/?plan_id=${planId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log("workout info", response.data);
				setWorkouts(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (planId !== undefined) fetchWorkoutsByPlan();
	}, [planId]);

	return (
		<div>
			<Grid item xs={12}>
				<Stack
					direction="row"
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Typography variant="h5" color="text.primary" sx={{ my: 1 }}>
						Workouts
					</Typography>
					<NewWorkoutForm planId={planId} />
				</Stack>
				<Divider />
				{workouts?.map((w) => (
					<Card key={w.id} sx={{ p: 1, my: 1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<p>
								Day {w.assigned_day} - {w.week_day}
							</p>
							<EditWorkoutForm
								workoutId={w.id}
								fetchWorkoutsByPlan={fetchWorkoutsByPlan}
							/>
						</Box>
					</Card>
				))}
			</Grid>
		</div>
	);
};

export default ProfileWorkoutList;
