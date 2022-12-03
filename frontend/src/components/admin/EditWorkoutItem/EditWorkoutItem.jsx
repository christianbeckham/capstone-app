import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import DateRange from "@mui/icons-material/DateRange";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

import useAuth from "../../../hooks/useAuth";
import { weekdays } from "../../../utils/weekdays";

const EditWorkoutItem = ({ workoutInfo, fetchWorkout }) => {
	const [user, token] = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [day, setDay] = useState(weekdays[0].value);

	const handleEditMode = () => setEditMode(!editMode);

	const handleCancel = () => {
		setDay(weekdays[0].value);
		setEditMode(false);
	};

	const handleDateChange = (e) => {
		console.log(e.target.value);
		setDay(e.target.value);
	};

	const patchUpdate = async () => {
		try {
			const finalData = { assigned_day: day };
			const response = await axios.patch(
				`http://localhost:8000/api/workouts/all/${workoutInfo.id}/`,
				finalData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
				fetchWorkout();
				setEditMode(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Stack direction="row">
				<Typography variant="h6">Details</Typography>
				{!editMode && (
					<IconButton size="small" onClick={handleEditMode}>
						<Edit fontSize="inherit" />
					</IconButton>
				)}
			</Stack>
			{editMode ? (
				<Stack direction={"row"}>
					<TextField
						fullWidth
						select
						variant="standard"
						label="Available Day(s)"
						name="assigned_day"
						value={day}
						onChange={handleDateChange}
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
					<Box>
						<IconButton onClick={patchUpdate}>
							<CheckCircle fontSize="inherit" />
						</IconButton>
						<IconButton onClick={handleCancel}>
							<Cancel fontSize="inherit" />
						</IconButton>
					</Box>
				</Stack>
			) : (
				<>
					<p>Id: {workoutInfo?.id}</p>
					<Typography variant="body1">
						Day {workoutInfo?.assigned_day}
					</Typography>
					<Typography variant="body1">{workoutInfo?.week_day}</Typography>
				</>
			)}
		</div>
	);
};

export default EditWorkoutItem;
