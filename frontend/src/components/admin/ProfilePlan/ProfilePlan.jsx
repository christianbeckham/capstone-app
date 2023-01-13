import React from "react";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import NewPlanModal from "../NewPlanModal/NewPlanModal";
import InfoRing from "../../app/InfoRing/InfoRing";

const ProfilePlan = ({ client, fetchClientUser }) => {
	return (
		<>
			{client?.training_plan ? (
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Stack spacing={2}>
							<Typography variant="h6">Macros</Typography>
							<Stack direction="row" spacing={1}>
								<InfoRing text="calories" value={client?.training_plan?.calories} />
								<InfoRing text="protein" value={client?.training_plan?.protein} />
								<InfoRing text="carbs" value={client?.training_plan?.carbs} />
								<InfoRing text="fats" value={client?.training_plan?.fats} />
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={2}>
							{client?.training_plan?.cost && (
								<Box>
									<Typography variant="h6">Cost</Typography>
									<Divider />
									<Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
										$ {client?.training_plan?.cost}
									</Typography>
								</Box>
							)}
							{client?.training_plan?.goal && (
								<Box>
									<Typography variant="h6">Goal</Typography>
									<Divider />
									<Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
										{client?.training_plan?.goal}
									</Typography>
								</Box>
							)}
						</Stack>
					</Grid>
				</Grid>
			) : (
				<NewPlanModal userId={client?.id} fetchClientUser={fetchClientUser} />
			)}
		</>
	);
};

export default ProfilePlan;
