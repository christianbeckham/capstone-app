import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import useAuth from "../../../hooks/useAuth";
import NewWorkoutForm from "../NewWorkoutForm/NewWorkoutForm";
import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

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
			<Grid item xs={12} md={6}>
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
						<ListItem
							key={w.id}
							secondaryAction={<EditWorkoutForm workoutId={w.id} />}
						>
							<ListItemAvatar>
								<Avatar>{w.assigned_day}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={w.week_day}
								secondary={`Day ${w.assigned_day}`}
							/>
						</ListItem>
					))}
				</List>
			</Grid>
		</div>
	);
};

export default WorkoutList;
