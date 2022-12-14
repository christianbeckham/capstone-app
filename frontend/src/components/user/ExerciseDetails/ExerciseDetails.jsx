import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const ExerciseDetails = ({ userExercise }) => {
	return (
		<Card>
			<CardHeader title={"Overview"} />
			<CardContent>
				{userExercise ? (
					userExercise ? (
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							gap={2}
							sx={{ my: 2 }}
						>
							<Box gridColumn="span 4">
								<Stack spacing={2}>
									{userExercise?.target && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Target
											</Typography>
											<Chip
												label={userExercise?.target}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
									{userExercise?.bodyPart && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Body Part
											</Typography>
											<Chip
												label={userExercise?.bodyPart}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
									{userExercise?.equipment && (
										<Stack spacing={1}>
											<Typography component="p" variant="body1">
												Equipment
											</Typography>
											<Chip
												label={userExercise?.equipment}
												variant="outlined"
												sx={{ textTransform: "capitalize" }}
											/>
										</Stack>
									)}
								</Stack>
							</Box>
							<Box sx={{ mx: "auto" }} gridColumn="span 8">
								{userExercise?.gifUrl ? (
									<Box
										component="img"
										height={350}
										width={350}
										src={userExercise?.gifUrl}
										alt={userExercise.name}
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
