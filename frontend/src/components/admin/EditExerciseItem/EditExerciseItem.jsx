import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import Add from "@mui/icons-material/Add";
import Alarm from "@mui/icons-material/Alarm";

import useAuth from "../../../hooks/useAuth";

const EditExerciseItem = ({ exercise, fetchExercises }) => {
	const { token } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [data, setData] = useState(exercise);
	const [error, setError] = useState(null);

	const handleEditMode = () => setEditMode(!editMode);

	const handleUpdateChange = (e) => {
		setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleUpdate = () => {
		const filterData = Object.entries(data).filter(([k, v]) => k !== "id");
		const finalData = Object.fromEntries(filterData);
		patchUpdate(finalData);
	};

	const handleCancel = () => {
		setData(exercise);
		setError(null);
		setEditMode(false);
	};

	const patchUpdate = async (data) => {
		try {
			const response = await axios.patch(
				`http://localhost:8000/api/exercises/${exercise.id}/`,
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
				fetchExercises();
				setError(null);
				handleEditMode();
			}
		} catch (error) {
			console.log(error);
			setError(error.response.data);
		}
	};

	const deleteExercise = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/exercises/${exercise.id}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 204) {
				fetchExercises();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{error &&
				Object.entries(error).map(([k, v], index) => (
					<Alert key={index} severity="error">
						{k}: {v}
					</Alert>
				))}
			<Card
				key={exercise.id}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					p: 1,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
					<Avatar sx={{ width: 24, height: 24, mx: 2 }}>
						<FitnessCenter fontSize="inherit" />
					</Avatar>
					{editMode ? (
						<>
							<Stack direction="row" spacing={1}>
								<TextField
									required
									fullWidth
									variant="standard"
									label="Sets"
									name="sets"
									value={data.sets || ""}
									onChange={handleUpdateChange}
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
									value={data.reps || ""}
									onChange={handleUpdateChange}
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
									value={data.rest_time || ""}
									onChange={handleUpdateChange}
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
										name="time_interval"
										value={data.time_interval || ""}
										onChange={handleUpdateChange}
									>
										{["seconds", "minutes"].map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Stack>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<IconButton aria-label="edit" onClick={handleUpdate}>
									<CheckCircle color="success" />
								</IconButton>
								<IconButton aria-label="edit" onClick={handleCancel}>
									<Cancel color="error" />
								</IconButton>
							</Box>
						</>
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								flexGrow: 1,
							}}
						>
							<Stack>
								<Typography sx={{ textTransform: "capitalize" }}>
									{exercise.name}
								</Typography>
								<Stack
									direction={"row"}
									divider={<Divider orientation="vertical" flexItem />}
									spacing={2}
								>
									<Typography variant="caption">
										Sets: {exercise.sets}
									</Typography>
									<Typography variant="caption">
										Reps: {exercise.reps}
									</Typography>
									<Typography variant="caption">
										Rest: {exercise.rest_time} {exercise.time_interval}
									</Typography>
								</Stack>
							</Stack>
							<Stack direction="row" spacing={1} sx={{ my: "auto" }}>
								<IconButton
									aria-label="edit"
									size="small"
									onClick={handleEditMode}
									sx={{ height: 28 }}
								>
									<Edit fontSize="inherit" />
								</IconButton>
								<IconButton
									aria-label="delete"
									size="small"
									onClick={deleteExercise}
									sx={{ height: 28 }}
								>
									<Delete fontSize="inherit" />
								</IconButton>
							</Stack>
						</Box>
					)}
				</Box>
			</Card>
		</>
	);
};

export default EditExerciseItem;
