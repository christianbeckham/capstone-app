import React, { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { apiExercises } from "../../../utils/exercisedata";

const ExerciseDetails = ({ exercise }) => {
	const [apiExercise, setApiExercise] = useState(null);

	useEffect(() => {
		console.log("ex", exercise);
		const findApiExercise = apiExercises.filter(
			(ex) => ex.name === exercise?.name
		);
		console.log("find api exercise", findApiExercise[0]);
		if (findApiExercise[0]) {
			const res = validateObjValues(findApiExercise[0]);
			console.log("res", res);
			setApiExercise(findApiExercise[0]);
		} else {
			setApiExercise(null);
		}
	}, [exercise]);

	const validateObjValues = (exerciseObj) => {
		return Object.fromEntries(
			Object.entries(exerciseObj).map((i) => {
				if (i[1]) return i;
				return false;
			})
		);
	};

	return (
		<Card>
			<CardHeader title={"Overview"} />
			<CardContent>
				{exercise ? (
					apiExercise ? (
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							gap={2}
							sx={{ my: 2 }}
						>
							<Box gridColumn="span 4">
								<Stack spacing={2}>
									{apiExercise?.target && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Target
											</Typography>
											<Chip
												label={apiExercise?.target}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
									{apiExercise?.bodyPart && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Body Part
											</Typography>
											<Chip
												label={apiExercise?.bodyPart}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
									{apiExercise?.equipment && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Equipment
											</Typography>
											<Chip
												label={apiExercise?.equipment}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
								</Stack>
							</Box>
							<Box sx={{ mx: "auto" }} gridColumn="span 8">
								{apiExercise?.gifUrl ? (
									<Box
										component="img"
										height={350}
										width={350}
										src={apiExercise?.gifUrl}
										alt={exercise.name}
										sx={{ borderRadius: 2 }}
									/>
								) : (
									<p>No preview</p>
								)}
							</Box>
						</Box>
					) : (
						<Box sx={{ my: 2 }}>
							<Typography component="p" variant="body2">
								No exercise preview
							</Typography>
						</Box>
					)
				) : (
					<Box sx={{ my: 2 }}>
						<Typography component="p" variant="body2">
							Select an exercise to view details
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default ExerciseDetails;
