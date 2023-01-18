import React, { useEffect, useState } from "react";
import axios from "axios";
import {
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
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Divider,
} from "@mui/material";
import { Add, Alarm } from "@mui/icons-material";

import useAuth from "../../../hooks/useAuth";

const AddExerciseModal = ({ workoutId, fetchExercises }) => {
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [newExercise, setNewExercise] = useState({});
	const [validExercise, setValidExercise] = useState(false);

	const [exerciseDB, setExerciseDB] = useState([]);
	const [filteredExercises, setFilteredExercises] = useState([]);
	const [allBodyParts, setAllBodyParts] = useState([]);
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [allTargets, setAllTargets] = useState([]);
	const [selectedTarget, setSelectedTarget] = useState("");

	const handleOpen = () => {
		fetchExerciseDB();
		setOpen(true);
	};

	const handleClose = () => {
		setSelectedBodyPart("");
		setSelectedTarget("");
		setAllTargets([]);
		setFilteredExercises([]);
		setNewExercise({});
		setValidExercise(false);
		setOpen(false);
	};

	const handleNewExercise = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewExercise((prevState) => ({ ...prevState, [name]: value }));
	};

	const addExercise = async () => {
		try {
			const finalData = {
				workouts_id: workoutId,
				...newExercise,
			};
			const response = await axios.post(`${process.env.REACT_APP_WEBSITE_URL}/api/exercises/`, finalData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 201) {
				fetchExercises();
				handleClose();
			}
		} catch (error) {
			console.log(error);
		}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<IconButton size="small" onClick={handleOpen} sx={{ bgcolor: "background.default" }}>
				<Add fontSize="inherit" />
			</IconButton>
			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>Add Exercise</DialogTitle>
				<Divider />
				<DialogContent>
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
							{filteredExercises.length > 0 && <p>{filteredExercises.length} exercises available</p>}
						</Box>
						<Typography variant="body1">Add Exercise</Typography>
						<Box sx={{ mt: 2, mb: 4 }}>
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
					<Box sx={{ float: "right" }}></Box>
				</DialogContent>
				<Divider />
				<DialogActions sx={{ mb: 1, mx: 2 }}>
					<Button onClick={handleClose} variant="outlined" color="error">
						Cancel
					</Button>
					<Button onClick={addExercise} disabled={!validExercise} color="success">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddExerciseModal;
