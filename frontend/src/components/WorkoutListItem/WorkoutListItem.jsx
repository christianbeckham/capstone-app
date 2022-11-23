import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const WorkoutListItem = ({ value, index, exercises }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index &&
				exercises.map((e) => (
					<Box key={e.id} sx={{ p: 3 }}>
						<Typography>{e.name}</Typography>
						<Typography>{e.sets}</Typography>
						<Typography>{e.reps}</Typography>
						<Typography>{e.rest_time}</Typography>
						<Typography>{e.time_interval}</Typography>
					</Box>
				))}
		</div>
	);
};

export default WorkoutListItem;
