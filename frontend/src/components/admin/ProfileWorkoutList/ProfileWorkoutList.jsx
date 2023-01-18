import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Typography, Paper } from "@mui/material";

import useAuth from "../../../hooks/useAuth";
import NewWorkoutForm from "../NewWorkoutForm/NewWorkoutForm";
import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

const ProfileWorkoutList = ({ planId }) => {
	const { token } = useAuth();
	const [workouts, setWorkouts] = useState([]);

	const fetchWorkoutsByPlan = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/workouts/?plan_id=${planId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setWorkouts(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (planId !== undefined) fetchWorkoutsByPlan();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planId]);

	return (
		<>
			<Grid container>
				<Grid item xs={1} md={2}>
					<NewWorkoutForm planId={planId} fetchWorkoutsByPlan={fetchWorkoutsByPlan} />
				</Grid>
				<Grid item xs={1} md={10}>
					{workouts?.length > 0 ? (
						workouts?.map((w) => (
							<Paper key={w.id} sx={{ mb: 1, p: 1, border: 1, borderColor: "divider" }}>
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
									<EditWorkoutForm workoutId={w.id} fetchWorkoutsByPlan={fetchWorkoutsByPlan} />
								</Box>
							</Paper>
						))
					) : (
						<Box sx={{ m: 1 }}>
							<Typography>No workouts available</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileWorkoutList;
