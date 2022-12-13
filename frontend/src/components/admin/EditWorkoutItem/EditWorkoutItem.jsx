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

const EditWorkoutItem = ({
	workoutInfo,
	fetchWorkout,
	fetchWorkoutsByPlan,
}) => {
	const { token } = useAuth();
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
				fetchWorkoutsByPlan();
				setEditMode(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Stack direction="row" spacing={1}>
				<Typography variant="h6">Details</Typography>
				{!editMode && (
					<IconButton
						size="small"
						onClick={handleEditMode}
						sx={{ bgcolor: "background.default" }}
					>
						<Edit fontSize="inherit" />
					</IconButton>
				)}
			</Stack>
			{editMode ? (
				<Stack direction={"row"} alignItems={"center"} sx={{ mt: 2 }}>
					<TextField
						fullWidth
						select
						variant="standard"
						label="Day"
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
						InputLabelProps={{
							shrink: true,
						}}
					>
						{weekdays.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
								sx={{ textTransform: "capitalize" }}
							>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mx: 1,
						}}
					>
						<IconButton onClick={patchUpdate}>
							<CheckCircle color="success" fontSize="inherit" />
						</IconButton>
						<IconButton onClick={handleCancel}>
							<Cancel color="error" fontSize="inherit" />
						</IconButton>
					</Box>
				</Stack>
			) : (
				<Stack direction="row" spacing={1} sx={{ mt: 2 }}>
					<Typography variant="body1">Set Day:</Typography>
					<Typography variant="body1" sx={{ textTransform: "capitalize" }}>
						{workoutInfo?.week_day}
					</Typography>
				</Stack>
			)}
		</div>
	);
};

export default EditWorkoutItem;
