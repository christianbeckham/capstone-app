import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { apiExercises } from "../../../utils/exercisedata";

const ExerciseDetails = ({ exercise }) => {
	const [apiExercise, setApiExercise] = useState({});

	useEffect(() => {
		const findApiExercise = apiExercises.filter(
			(ex) => ex.name === exercise?.name
		);
		setApiExercise(findApiExercise[0]);
	}, [exercise]);

	return (
		<Card sx={{ p: 2 }}>
			<Typography component="h2" variant="h2">
				Overview
			</Typography>
			{exercise ? (
				<>
					<p>Target: {apiExercise?.target}</p>
					<p>Body Part: {apiExercise?.bodyPart}</p>
					<p>Equipment: {apiExercise?.equipment}</p>
					<img
						height={350}
						width={350}
						src={apiExercise?.gifUrl}
						alt={exercise.name}
					/>
				</>
			) : (
				<Typography component="p" variant="body2">
					Select an exercise to view details.
				</Typography>
			)}
		</Card>
	);
};

export default ExerciseDetails;
