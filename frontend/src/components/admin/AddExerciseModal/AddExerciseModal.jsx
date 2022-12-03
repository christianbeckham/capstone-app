import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Add from "@mui/icons-material/Add";
import Alarm from "@mui/icons-material/Alarm";

import useAuth from "../../../hooks/useAuth";
import { apiExercises } from "../../../utils/exercisedata";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "1px solid #aeaeae",
	borderRadius: "5px",
	boxShadow: 24,
	p: 4,
};

const AddExerciseModal = ({ workoutId, fetchExercises }) => {
	const [user, token] = useAuth();
	const [open, setOpen] = useState(false);
	const [newExercise, setNewExercise] = useState({});
	const [validExercise, setValidExercise] = useState(false);

	const [exerciseDB, setExerciseDB] = useState(apiExercises);
	const [filteredExercises, setFilteredExercises] = useState([]);
	const [allBodyParts, setAllBodyParts] = useState([]);
	const [selectedBodyPart, setSelectedBodyPart] = useState("");
	const [allTargets, setAllTargets] = useState([]);
	const [selectedTarget, setSelectedTarget] = useState("");

	const handleOpen = () => setOpen(true);
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
			const response = await axios.post(
				"http://localhost:8000/api/exercises/",
				finalData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
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
			<Button onClick={handleOpen}>Add Exercise</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<h2>New Exercise</h2>
					<br />
					<Grid item>
						<Box sx={{ mb: 4 }}>
							<DialogContentText color={"text.primary"}>
								Filter exercises
							</DialogContentText>
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
							<DialogContentText color={"text.primary"}>
								Add exercise
							</DialogContentText>
							<Box sx={{ mt: 2, mb: 4 }}>
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
						<Box sx={{ float: "right" }}>
							<Stack direction="row" spacing={1}>
								<Button
									onClick={addExercise}
									variant="contained"
									disabled={!validExercise}
								>
									Add
								</Button>
								<Button onClick={handleClose} variant="contained" color="error">
									Cancel
								</Button>
							</Stack>
						</Box>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
};

export default AddExerciseModal;
