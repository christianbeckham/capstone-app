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

const EditWorkoutItem = ({ workoutInfo, fetchWorkout, fetchWorkoutsByPlan }) => {
	const { token } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [day, setDay] = useState(weekdays[0].value);

	const handleEditMode = () => setEditMode(!editMode);

	const handleCancel = () => {
		setDay(weekdays[0].value);
		setEditMode(false);
	};

	const handleDateChange = (e) => {
		setDay(e.target.value);
	};

	const patchUpdate = async () => {
		try {
			const finalData = { assigned_day: day };
			const response = await axios.patch(
				`${process.env.REACT_APP_WEBSITE_URL}/api/workouts/all/${workoutInfo.id}/`,
				finalData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				fetchWorkout();
				fetchWorkoutsByPlan();
				setEditMode(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box>
			<Stack direction="row" spacing={1}>
				<Typography variant="h6">Day</Typography>
			</Stack>
			<Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
				<TextField
					disabled={!editMode}
					fullWidth
					select
					name="assigned_day"
					value={day}
					onChange={handleDateChange}
					sx={{ textTransform: "capitalize" }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<DateRange />
							</InputAdornment>
						),
					}}
				>
					{weekdays.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>
					{editMode ? (
						<Stack direction="row">
							<IconButton onClick={patchUpdate}>
								<CheckCircle color="success" fontSize="inherit" />
							</IconButton>
							<IconButton onClick={handleCancel}>
								<Cancel color="error" fontSize="inherit" />
							</IconButton>
						</Stack>
					) : (
						<IconButton onClick={handleEditMode} sx={{ bgcolor: "background.default" }}>
							<Edit fontSize="inherit" />
						</IconButton>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default EditWorkoutItem;
