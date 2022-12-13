import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowRight from "@mui/icons-material/ArrowRight";

import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";

const WorkoutList = ({ workouts }) => {
	const [exercises, setExercises] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectDay, setSelectDay] = useState(0);
	const [exercise, setExercise] = useState(null);

	const handleTabChange = (e, newValue) => {
		setSelectDay(newValue);
		setExercises(workouts[newValue].exercises);
	};

	const handleSetExercise = (e, newValue) => {
		setExercise(newValue);
	};

	useEffect(() => {
		if (workouts !== undefined) {
			if (workouts.length > 0) {
				setExercises(workouts[0].exercises);
				setLoading(false);
			}
		}
	}, [workouts]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : workouts ? (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Tabs value={selectDay} onChange={handleTabChange}>
							{workouts
								.sort((a, b) => a.assigned_day - b.assigned_day)
								.map((workout) => (
									<Tab key={workout.id} label={`Day ${workout.assigned_day}`} />
								))}
						</Tabs>
					</Grid>
					<Grid item xs={6}>
						<Card>
							<CardHeader title={"Exercises"} />
							<CardContent>
								{exercises.map((exercise) => (
									<List key={exercise.id}>
										<ListItem disablePadding component="div">
											<ListItemButton
												onClick={(_) => handleSetExercise(_, exercise)}
											>
												<ListItemIcon>
													<ArrowRight />
												</ListItemIcon>
												<ListItemText>
													<Typography
														component="p"
														variant="body1"
														sx={{ textTransform: "capitalize" }}
													>
														{exercise.name}
													</Typography>
													<Stack
														direction="row"
														divider={
															<Divider orientation="vertical" flexItem />
														}
														spacing={2}
													>
														<Typography component="span" variant="caption">
															{`Sets: ${exercise.sets}`}
														</Typography>
														<Typography component="span" variant="caption">
															{`Reps: ${exercise.reps}`}
														</Typography>
														<Typography component="span" variant="caption">
															{`Rest: ${exercise.rest_time} ${exercise.time_interval}`}
														</Typography>
													</Stack>
												</ListItemText>
											</ListItemButton>
										</ListItem>
									</List>
								))}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>
						<ExerciseDetails exercise={exercise} />
					</Grid>
				</Grid>
			) : (
				<p>No workouts</p>
			)}
		</div>
	);
};

export default WorkoutList;
