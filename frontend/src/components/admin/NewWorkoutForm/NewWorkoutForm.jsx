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
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import DateRange from "@mui/icons-material/DateRange";
import Add from "@mui/icons-material/Add";
import Alarm from "@mui/icons-material/Alarm";

import useAuth from "../../../hooks/useAuth";
import { apiExercises } from "../../../utils/exercisedata";

const NewWorkoutForm = ({ planId }) => {
	const [user, token] = useAuth();
	const [open, setOpen] = useState(false);
	const [workoutDay, setWorkoutDay] = useState({ assigned_day: 1 });
	const [exercises, setExercises] = useState([]);
	const [newExercise, setNewExercise] = useState({});
	const [validExercise, setValidExercise] = useState(false);

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

	const handleFormOpen = () => setOpen(true);

	const handleFormClose = () => {
		setOpen(false);
		clearExerciseFields();
	};

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
		setValidExercise(false);
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
		handleFormClose();
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

	useEffect(() => {
		const keys = ["name", "reps", "sets", "rest_time", "time_interval"];
		const isValid = keys.every((k) => {
			if (newExercise.hasOwnProperty(k)) {
				return newExercise[k] !== "" || newExercise[k] !== 0;
			}
			return false;
		});
		if (isValid) setValidExercise(true);
	}, [newExercise]);

	return (
		<div>
			<Tooltip title="New" placement="top" arrow>
				<IconButton size="small" onClick={handleFormOpen}>
					<Add fontSize="inherit" />
				</IconButton>
			</Tooltip>

			<Dialog open={open} onClose={handleFormClose} maxWidth="md" fullWidth>
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
												<FormControl sx={{ width: "100%" }}>
													<InputLabel
														id="bodyPartSelect"
														shrink
														variant="standard"
													>
														Body Part
													</InputLabel>
													<Select
														labelId="bodyPartSelect"
														label="Body Part"
														name="body_part"
														value={selectedBodyPart || ""}
														onChange={handleBodyPartChange}
														variant="standard"
													>
														{allBodyParts.map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</Select>
												</FormControl>
												<FormControl sx={{ width: "100%" }}>
													<InputLabel
														id="targetSelect"
														shrink
														variant="standard"
													>
														Target
													</InputLabel>
													<Select
														id="targetSelect"
														label="Target"
														name="target"
														value={selectedTarget || ""}
														onChange={handleTargetChange}
														disabled={!Boolean(selectedBodyPart)}
														variant="standard"
													>
														{allTargets.map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</Select>
												</FormControl>
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
											<FormControl sx={{ width: "100%" }}>
												<InputLabel
													id="exerciseSelect"
													shrink
													variant="standard"
													required
												>
													Exercise
												</InputLabel>
												<Select
													required
													labelId="exerciseSelect"
													label="Exercise"
													name="name"
													value={newExercise.name || ""}
													onChange={handleNewExercise}
													disabled={!Boolean(selectedTarget)}
													variant="standard"
													sx={{ mb: 4 }}
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
											</FormControl>

											{/* SET EXERCISE FIELDS */}
											<Stack direction="row" spacing={2}>
												<TextField
													required
													fullWidth
													variant="standard"
													label="Sets"
													name="sets"
													value={newExercise.sets || ""}
													onChange={handleNewExercise}
													disabled={!Boolean(newExercise.name)}
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
													required
													variant="standard"
													type="number"
													label="Reps"
													name="reps"
													value={newExercise.reps || ""}
													onChange={handleNewExercise}
													disabled={!Boolean(newExercise.name)}
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
													required
													variant="standard"
													type="number"
													label="Rest"
													name="rest_time"
													value={newExercise.rest_time || ""}
													onChange={handleNewExercise}
													disabled={!Boolean(newExercise.name)}
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
												<FormControl sx={{ width: "100%" }}>
													<InputLabel
														id="timeIntervalSelect"
														shrink
														variant="standard"
														required
													>
														Time Interval
													</InputLabel>
													<Select
														required
														labelId="timeIntervalSelect"
														variant="standard"
														label="Time Interval"
														name="time_interval"
														value={newExercise.time_interval || ""}
														onChange={handleNewExercise}
														disabled={!Boolean(newExercise.name)}
													>
														{["seconds", "minutes"].map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</Stack>
										</Box>
									</Box>
									{/* ADD & CLEAR EXERCISE */}
									<Box sx={{ float: "right" }}>
										<Stack direction="row" spacing={1}>
											<Button
												onClick={addExercise}
												variant="contained"
												disabled={!validExercise}
											>
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
						<Button onClick={handleFormClose} variant="contained" color="error">
							Cancel
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default NewWorkoutForm;
