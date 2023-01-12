import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Grid,
	Box,
	Stack,
	Dialog,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	List,
	ListItem,
	ListItemText,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Divider,
} from "@mui/material";
import { Add, Alarm, DateRange, Delete } from "@mui/icons-material";

import useAuth from "../../../hooks/useAuth";
import { weekdays } from "../../../utils/weekdays";

const NewWorkoutForm = ({ planId, fetchWorkoutsByPlan }) => {
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [workoutDay, setWorkoutDay] = useState(weekdays[0]?.value);
	const [exercises, setExercises] = useState([]);
	const [newExercise, setNewExercise] = useState({});
	const [validExercise, setValidExercise] = useState(false);

	const [exerciseDB, setExerciseDB] = useState([]);
	const [filteredExercises, setFilteredExercises] = useState([]);
	const [allBodyParts, setAllBodyParts] = useState([]);
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [allTargets, setAllTargets] = useState([]);
	const [selectedTarget, setSelectedTarget] = useState("");

	const handleFormOpen = () => {
		fetchExerciseDB();
		setOpen(true);
	};

	const handleFormClose = () => {
		setOpen(false);
		clearExerciseFields();
		setExercises([]);
	};

	const handleWorkoutDayChange = (e) => setWorkoutDay(e.target.value);

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
			const response = await axios.post(`${process.env.REACT_APP_WEBSITE_URL}/api/workouts/all/`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 201) {
				fetchWorkoutsByPlan();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const finalData = {
			training_plan_id: planId,
			assigned_day: workoutDay,
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

	const fetchExerciseDB = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/exercises/db/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) setExerciseDB(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const bodyParts = [...new Set(exerciseDB.map((ex) => ex.bodyPart))].sort();
		setAllBodyParts(bodyParts);
	}, [exerciseDB]);

	useEffect(() => {
		if (selectedBodyPart !== "") {
			const target = [
				...new Set(exerciseDB.filter((ex) => ex.bodyPart === selectedBodyPart).map((ex) => ex.target)),
			].sort();
			setAllTargets(target);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBodyPart]);

	useEffect(() => {
		if (selectedBodyPart !== "" && selectedTarget !== "") {
			const finalExercises = exerciseDB
				.filter((ex) => ex.bodyPart === selectedBodyPart && ex.target === selectedTarget)
				.sort();
			setFilteredExercises(finalExercises);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<Button onClick={handleFormOpen} startIcon={<Add />}>
				New
			</Button>
			<Dialog open={open} onClose={handleFormClose} maxWidth="lg" fullWidth>
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
									label="Day"
									name="assigned_day"
									value={workoutDay || weekdays[0]?.value}
									onChange={handleWorkoutDayChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRange />
											</InputAdornment>
										),
									}}
									sx={{ textTransform: "capitalize" }}
								>
									{weekdays.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item container direction="row" xs={12} sx={{ mt: 2 }}>
								<Grid
									item
									xs={7}
									sx={{
										borderWidth: 1,
										borderStyle: "solid",
										borderColor: "background.neutral",
										borderRadius: 2,
										p: 1,
									}}
								>
									{/* FILTER BODY PART & TARGET */}
									<Box sx={{ mb: 4 }}>
										<Typography variant="body1">Filter Exercises</Typography>
										<Box sx={{ mt: 2, mb: 4 }}>
											<Stack direction={"row"} spacing={2}>
												<FormControl sx={{ width: "100%" }}>
													<InputLabel id="bodyPartSelect" shrink variant="standard">
														Body Part
													</InputLabel>
													<Select
														labelId="bodyPartSelect"
														label="Body Part"
														name="body_part"
														value={selectedBodyPart || ""}
														onChange={handleBodyPartChange}
													>
														{allBodyParts.map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</Select>
												</FormControl>
												<FormControl sx={{ width: "100%" }}>
													<InputLabel id="targetSelect" shrink variant="standard">
														Target
													</InputLabel>
													<Select
														id="targetSelect"
														label="Target"
														name="target"
														value={selectedTarget || ""}
														onChange={handleTargetChange}
														disabled={!Boolean(selectedBodyPart)}
													>
														{allTargets.map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</Stack>
											<Typography
												variant="caption"
												sx={{
													opacity: Boolean(filteredExercises.length) ? 1 : 0,
												}}
											>
												{filteredExercises.length} exercises available
											</Typography>
										</Box>
										{/* ADD EXERCISE */}
										<Typography variant="body1">Add Exercise</Typography>
										<Box sx={{ mt: 2, mb: 4 }}>
											{/* EXERCISE ONLY */}
											<FormControl sx={{ width: "100%" }}>
												<InputLabel id="exerciseSelect" shrink variant="standard" required>
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
												/>
												<TextField
													fullWidth
													required
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
												/>
												<TextField
													fullWidth
													required
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
												/>
												<FormControl sx={{ width: "100%" }}>
													<InputLabel id="timeIntervalSelect" shrink variant="standard" required>
														Time Interval
													</InputLabel>
													<Select
														required
														labelId="timeIntervalSelect"
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
												onClick={clearExerciseFields}
												variant="outlined"
												color="warning"
												disabled={!selectedBodyPart}
											>
												Clear
											</Button>
											<Button onClick={addExercise} disabled={!validExercise}>
												Add
											</Button>
										</Stack>
									</Box>
								</Grid>
								<Grid item xs={5} sx={{ px: 2 }}>
									<Typography variant="body1">Exercises</Typography>
									<List sx={{ maxHeight: 375, overflow: "auto" }}>
										<Stack spacing={1} sx={{ px: 1 }} divider={<Divider />}>
											{exercises?.length > 0 &&
												exercises.map((ex, index) => (
													<ListItem
														key={index}
														secondaryAction={
															<IconButton size="small" onClick={() => removeExercise(index)} sx={{ height: 28 }}>
																<Delete fontSize="inherit" />
															</IconButton>
														}
													>
														<ListItemText>
															<Typography
																variant="body2"
																sx={{
																	display: "flex",
																	textTransform: "capitalize",
																}}
															>
																{ex.name}
															</Typography>
															<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
																<Typography variant="caption">Sets {ex.sets}</Typography>
																<Typography variant="caption">Reps {ex.reps}</Typography>
																<Typography variant="caption">
																	Rest {ex.rest_time} {ex.time_interval}
																</Typography>
															</Stack>
														</ListItemText>
													</ListItem>
												))}
										</Stack>
									</List>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ mb: 1, mx: 2 }}>
						<Button onClick={handleFormClose} variant="outlined" color="error">
							Cancel
						</Button>
						<Button type="submit" color="success" disabled={!Boolean(exercises.length)}>
							Save
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default NewWorkoutForm;
