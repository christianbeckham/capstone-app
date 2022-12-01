import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import { Typography, Select } from "@mui/material";

import DateRange from "@mui/icons-material/DateRange";
import Add from "@mui/icons-material/Add";
import Alarm from "@mui/icons-material/Alarm";

import useAuth from "../../hooks/useAuth";
import { apiExercises } from "../../utils/exercisedata";

const AdminNewWorkoutForm = ({ planId }) => {
	const [user, token] = useAuth();
	const [workoutDay, setWorkoutDay] = useState({ assigned_day: 1 });
	const [exercises, setExercises] = useState([]);
	const [newExercise, setNewExercise] = useState({});

	const [exerciseDB, setExerciseDB] = useState(apiExercises);
	const [filteredExercises, setFilteredExercises] = useState([]);
	const [allBodyParts, setAllBodyParts] = useState([]);
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [allTargets, setAllTargets] = useState([]);
	const [selectedTarget, setSelectedTarget] = useState("");

	const weekdays = [
		{ value: 1, label: "monday" },
		{ value: 2, label: "tuesday" },
		{ value: 3, label: "wednesday" },
		{ value: 4, label: "thursday" },
		{ value: 5, label: "friday" },
		{ value: 6, label: "saturday" },
		{ value: 7, label: "sunday" },
	];

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleWorkoutDayChange = (e) => {
		setWorkoutDay({ [e.target.name]: e.target.value });
	};

	const handleNewExercise = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewExercise((prevState) => ({ ...prevState, [name]: value }));
	};

	const addExercise = () => {
		setExercises((prevState) => [...prevState, newExercise]);
		clearExerciseFields();
	};

	const clearExerciseFields = () => {
		setSelectedBodyPart("");
		setSelectedTarget("");
		setAllTargets([]);
		setFilteredExercises([]);
		setNewExercise({});
	};

	const removeExercise = (index) => {
		const tempArray = exercises.filter((obj, idx) => idx !== index);
		setExercises(tempArray);
	};

	const postWorkout = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/workouts/all/",
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 201) {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const finalData = {
			training_plan_id: planId,
			...workoutDay,
			exercises,
		};

		postWorkout(finalData);
		setExercises([]);
		handleClose();
	};

	const handleBodyPartChange = (e) => {
		setSelectedBodyPart(e.target.value);
		setSelectedTarget("");
		setFilteredExercises([]);
		setNewExercise({});
	};

	const handleTargetChange = (e) => {
		setSelectedTarget(e.target.value);
		setFilteredExercises([]);
		setNewExercise({});
	};

	useEffect(() => {
		// API call to get ExerciseDB data
		setExerciseDB(apiExercises);
		const bodyParts = [...new Set(exerciseDB.map((ex) => ex.bodyPart))].sort();
		setAllBodyParts(bodyParts);
	}, []);

	useEffect(() => {
		console.log("selected body part is", selectedBodyPart);
		if (selectedBodyPart !== "") {
			const target = [
				...new Set(
					exerciseDB
						.filter((ex) => ex.bodyPart === selectedBodyPart)
						.map((ex) => ex.target)
				),
			].sort();
			setAllTargets(target);
			console.log("all targets are", target);
		}
	}, [selectedBodyPart]);

	useEffect(() => {
		if (selectedBodyPart !== "" && selectedTarget !== "") {
			const finalExercises = exerciseDB
				.filter(
					(ex) =>
						ex.bodyPart === selectedBodyPart && ex.target === selectedTarget
				)
				.sort();
			setFilteredExercises(finalExercises);
			console.log(finalExercises);
		}
	}, [selectedBodyPart, selectedTarget]);

	return (
		<div>
			<Tooltip title="New" placement="top" arrow>
				<IconButton size="small" onClick={handleOpen}>
					<Add fontSize="inherit" />
				</IconButton>
			</Tooltip>

			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<DialogTitle>New Workout</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container rowGap={2}>
							<Grid item xs>
								{/* SELECT DATE FIELD */}
								<TextField
									fullWidth
									select
									variant="standard"
									label="Day"
									name="assigned_day"
									value={workoutDay.assigned_day}
									onChange={handleWorkoutDayChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRange />
											</InputAdornment>
										),
									}}
									InputLabelProps={{
										shrink: true,
									}}
								>
									{weekdays.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid
								container
								direction="row"
								rowGap={2}
								sx={{
									mt: 2,
									p: 2,
									border: "1px solid lightgray",
									borderRadius: 2,
								}}
							>
								<Grid item xs={8}>
									{/* FILTER BODY PART & TARGET */}
									<Box sx={{ mb: 4 }}>
										<DialogContentText color={"text.primary"}>
											Filter exercises
										</DialogContentText>
										<Box sx={{ mt: 2, mb: 4 }}>
											<Stack direction={"row"} spacing={2}>
												<Select
													fullWidth
													variant="standard"
													label="Body Part"
													name="body_part"
													value={selectedBodyPart || ""}
													onChange={handleBodyPartChange}
												>
													{allBodyParts.map((option) => (
														<MenuItem
															key={option}
															value={option}
															sx={{ zIndex: 3000 }}
														>
															{option}
														</MenuItem>
													))}
												</Select>

												<Select
													fullWidth
													variant="standard"
													label="Target"
													name="target"
													value={selectedTarget || ""}
													onChange={handleTargetChange}
												>
													{allTargets.map((option) => (
														<MenuItem
															key={option}
															value={option}
															sx={{ zIndex: 3000 }}
														>
															{option}
														</MenuItem>
													))}
												</Select>
											</Stack>
											{filteredExercises.length > 0 && (
												<p>{filteredExercises.length} exercises available</p>
											)}
										</Box>

										{/* ADD EXERCISE */}
										<DialogContentText color={"text.primary"}>
											Add exercise
										</DialogContentText>
										<Box sx={{ mt: 2, mb: 4 }}>
											{/* EXERCISE ONLY */}
											<Select
												sx={{ mb: 4 }}
												fullWidth
												variant="standard"
												label="Exercise"
												name="name"
												value={newExercise.name || ""}
												onChange={handleNewExercise}
												MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
											>
												{filteredExercises.map((option, index) => (
													<MenuItem
														key={option.id}
														value={option.name}
														dense
														sx={{
															"& .MuiPopover-paper": {
																height: 80,
															},
														}}
													>
														{option.name}
													</MenuItem>
												))}
											</Select>

											{/* SET EXERCISE FIELDS */}
											<Stack direction="row" spacing={2}>
												<TextField
													fullWidth
													variant="standard"
													label="Sets"
													name="sets"
													value={newExercise.sets || ""}
													onChange={handleNewExercise}
													type="number"
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<Add />
															</InputAdornment>
														),
													}}
													InputLabelProps={{
														shrink: true,
													}}
												/>

												<TextField
													fullWidth
													variant="standard"
													type="number"
													label="Reps"
													name="reps"
													value={newExercise.reps || ""}
													onChange={handleNewExercise}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<Add />
															</InputAdornment>
														),
													}}
													InputLabelProps={{
														shrink: true,
													}}
												/>

												<TextField
													fullWidth
													variant="standard"
													type="number"
													label="Rest"
													name="rest_time"
													value={newExercise.rest_time || ""}
													onChange={handleNewExercise}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<Alarm />
															</InputAdornment>
														),
													}}
													InputLabelProps={{
														shrink: true,
													}}
												/>

												<Select
													fullWidth
													variant="standard"
													label="Time Interval"
													name="time_interval"
													value={newExercise.time_interval || ""}
													onChange={handleNewExercise}
												>
													{["seconds", "minutes"].map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</Stack>
										</Box>
									</Box>
									{/* ADD & CLEAR EXERCISE */}
									<Box sx={{ float: "right" }}>
										<Stack direction="row" spacing={1}>
											<Button onClick={addExercise} variant="contained">
												Add
											</Button>
											<Button
												onClick={clearExerciseFields}
												variant="contained"
												color="warning"
											>
												Clear
											</Button>
										</Stack>
									</Box>
								</Grid>

								<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
								<Grid item xs={3}>
									<DialogContentText color={"text.primary"}>
										Exercises
									</DialogContentText>
									<Divider />
									{exercises?.length > 0 &&
										exercises.map((ex, index) => (
											<span key={index}>
												<Typography
													key={index}
													variant="body2"
													sx={{ display: "flex", my: 1 }}
												>
													{ex.name} {ex.sets}/{ex.reps}/{ex.rest_time}
												</Typography>
												<Button
													size="small"
													onClick={() => removeExercise(index)}
												>
													x
												</Button>
											</span>
										))}
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ mb: 1, mx: 2 }}>
						<Button type="submit" variant="contained" color="success">
							Save
						</Button>
						<Button onClick={handleClose} variant="contained" color="error">
							Cancel
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default AdminNewWorkoutForm;
