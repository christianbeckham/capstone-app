import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import useAuth from "../../../hooks/useAuth";
import NewWorkoutForm from "../NewWorkoutForm/NewWorkoutForm";
import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

const ProfileWorkoutList = ({ planId }) => {
	const { token } = useAuth();
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
					<NewWorkoutForm
						planId={planId}
						fetchWorkoutsByPlan={fetchWorkoutsByPlan}
					/>
				</Stack>
				<Divider />
				{workouts?.map((w) => (
					<Paper key={w.id} sx={{ p: 1, my: 1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Typography sx={{ textTransform: "capitalize" }}>
								Day {w.assigned_day} - {w.week_day}
							</Typography>
							<EditWorkoutForm
								workoutId={w.id}
								fetchWorkoutsByPlan={fetchWorkoutsByPlan}
							/>
						</Box>
					</Paper>
				))}
			</Grid>
		</div>
	);
};

export default ProfileWorkoutList;
