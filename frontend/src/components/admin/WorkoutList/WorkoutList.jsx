import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

const WorkoutList = ({ workouts }) => {
	return (
		<div>
			<Grid item xs={12} md={6}>
				<List dense>
					{workouts?.map((w) => (
						<ListItem
							key={w.id}
							secondaryAction={
								<EditWorkoutForm workoutId={w.id} />
							}
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
