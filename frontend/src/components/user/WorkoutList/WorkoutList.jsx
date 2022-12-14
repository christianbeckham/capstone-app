import React, { useEffect, useState } from "react";
import axios from "axios";

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

import useAuth from "../../../hooks/useAuth";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";

const WorkoutList = ({ workouts }) => {
	const { token } = useAuth();
	const [userExercise, setUserExercise] = useState(null);
	const [userExercises, setUserExercises] = useState([]);
	const [exerciseDB, setExerciseDB] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dayTab, setDayTab] = useState(0);

	const handleTabChange = (e, newValue) => {
		setDayTab(newValue);
		setUserExercises(workouts[newValue].exercises);
	};

	const handleSetExercise = (e, newValue) => {
		console.log("Exercise to filter", newValue);
		const findExercise = exerciseDB.filter((ex) => ex.name === newValue.name);
		console.log("Exercise to view", findExercise);

		if (findExercise[0]) {
			setUserExercise(findExercise[0]);
		} else {
			setUserExercise(null);
		}
	};

	const fetchExerciseDB = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/exercises/db/",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) setExerciseDB(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (workouts !== undefined) {
			if (workouts.length > 0) {
				console.log("Call API to get Exercise DB");
				fetchExerciseDB();
				setUserExercises(workouts[0].exercises);
				setLoading(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workouts]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : workouts ? (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Tabs value={dayTab} onChange={handleTabChange}>
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
								{userExercises.map((exercise) => (
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
						<ExerciseDetails userExercise={userExercise} />
					</Grid>
				</Grid>
			) : (
				<p>No workouts</p>
			)}
		</div>
	);
};

export default WorkoutList;
