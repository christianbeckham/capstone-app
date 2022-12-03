import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import useAuth from "../../../hooks/useAuth";
import NewWorkoutForm from "../NewWorkoutForm/NewWorkoutForm";
import EditWorkoutOptions from "../EditWorkoutOptions/EditWorkoutOptions";

const WorkoutList = ({ planId }) => {
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
				<Box>
					<Typography
						variant="h5"
						color="text.primary"
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							my: 1,
						}}
					>
						Workouts
						<NewWorkoutForm planId={planId} />
					</Typography>
				</Box>
				<Divider />
				<List dense>
					{workouts?.map((w) => (
						<Card key={w.id} sx={{ p: 1, my: 1 }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Stack direction={"row"}>
									<p>
										Day {w.assigned_day} - {w.week_day}
									</p>
								</Stack>
								<EditWorkoutOptions
									workoutId={w.id}
									fetchWorkoutsByPlan={fetchWorkoutsByPlan}
								/>
							</Box>
						</Card>
					))}
				</List>
			</Grid>
		</div>
	);
};

export default WorkoutList;
