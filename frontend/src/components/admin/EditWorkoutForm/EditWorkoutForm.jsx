import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";

const EditWorkoutForm = ({ workoutId }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div>
			<IconButton
				edge="end"
				aria-label="edit"
				size="small"
				onClick={handleClick}
			>
				<Edit fontSize="inherit" />
			</IconButton>
			{open && <div>other form {workoutId}</div>}
		</div>
	);
};

export default EditWorkoutForm;
