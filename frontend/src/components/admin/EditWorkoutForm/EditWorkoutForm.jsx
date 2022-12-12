import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";
import Delete from "@mui/icons-material/Delete";

import useAuth from "../../../hooks/useAuth";
import EditWorkoutItem from "../EditWorkoutItem/EditWorkoutItem";
import EditExerciseItem from "../EditExerciseItem/EditExerciseItem";
import AddExerciseModal from "../AddExerciseModal/AddExerciseModal";

const EditWorkoutForm = ({ workoutId, fetchWorkoutsByPlan }) => {
	const { token } = useAuth();
	const [workoutInfo, setWorkoutInfo] = useState(null);
	const [exercises, setExercises] = useState([]);
	const [open, setOpen] = useState(false);

	const handleFormOpen = () => {
		setOpen(!open);
		fetchWorkout();
	};

	const handleFormClose = () => {
		setOpen(false);
	};

	const handleFormSubmit = () => {};

	const fetchWorkout = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/workouts/${workoutId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log("workout info", response.data);
				setWorkoutInfo(response.data);
				setExercises(response.data.exercises);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchExercises = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/exercises/?workout_id=${workoutId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log("exercises", response.data);
				setExercises(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleWorkoutDelete = () => {
		console.log("deleting workout id:", workoutId);
		deleteWorkout();
		handleFormClose();
	};

	const deleteWorkout = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/workouts/all/${workoutId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 204) {
				console.log(response.status);
				fetchWorkoutsByPlan();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<IconButton color="primary" size="small" onClick={handleFormOpen}>
				<Launch fontSize="inherit" />
			</IconButton>
			<Dialog open={open} onClose={handleFormClose} maxWidth="md" fullWidth>
				<Box component={"form"} onSubmit={handleFormSubmit}>
					<DialogTitle
						sx={{
							display: "flex",
							justifyContent: "space-between",
							textTransform: "capitalize",
						}}
					>
						Day {workoutInfo?.assigned_day} - {workoutInfo?.week_day}
						<IconButton size="small" onClick={handleWorkoutDelete}>
							<Delete fontSize="inherit" />
						</IconButton>
					</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container rowGap={4}>
							<Grid item xs={12}>
								<EditWorkoutItem
									workoutInfo={workoutInfo}
									fetchWorkout={fetchWorkout}
								/>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} spacing={1} alignItems={"center"}>
									<Typography variant="h6" color="text.primary" sx={{ my: 1 }}>
										Exercises
									</Typography>
									<AddExerciseModal
										workoutId={workoutId}
										fetchExercises={fetchExercises}
									/>
								</Stack>
								<Stack rowGap={2}>
									{exercises?.map((ex) => (
										<EditExerciseItem
											key={ex.id}
											exercise={ex}
											fetchExercises={fetchExercises}
										/>
									))}
								</Stack>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions sx={{ mb: 1, mx: 2 }}>
						<Button onClick={handleFormClose} variant="contained" color="error">
							Close
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default EditWorkoutForm;
