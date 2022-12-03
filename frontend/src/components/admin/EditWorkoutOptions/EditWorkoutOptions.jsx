import React, { useState } from "react";
import axios from "axios";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import Delete from "@mui/icons-material/Delete";

import useAuth from "../../../hooks/useAuth";
import EditWorkoutForm from "../EditWorkoutForm/EditWorkoutForm";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "left",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "left",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(0),
		minWidth: 120,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const EditWorkoutOptions = ({ workoutId, fetchWorkoutsByPlan }) => {
	const [user, token] = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOptionsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleOptionsClose = () => {
		setAnchorEl(null);
	};

	const handleWorkoutDelete = () => {
		console.log("deleting workout id:", workoutId);
		deleteWorkout();
		handleOptionsClose();
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
			<IconButton
				aria-label="more"
				id="workout-option-button"
				aria-controls={open ? "workout-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				size="small"
				onClick={handleOptionsClick}
			>
				<MoreVert fontSize="inherit" />
			</IconButton>
			<StyledMenu
				id="workout-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleOptionsClose}
				autoFocus={false}
				keepMounted
			>
				<MenuItem
					component={EditWorkoutForm}
					workoutId={workoutId}
					handleOptionsClose={handleOptionsClose}
					disableRipple
				/>
				<MenuItem onClick={handleWorkoutDelete}>
					<Delete />
					Delete
				</MenuItem>
			</StyledMenu>
		</div>
	);
};

export default EditWorkoutOptions;
