import React from "react";
import { Grid, Stack, Typography, Chip } from "@mui/material";

const ProfileCard = ({ client }) => {
	return (
		<>
			<Grid container>
				<Grid item>
					<Stack spacing={1}>
						<Typography variant="1" color="text.secondary">
							Username: {client?.username}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Email: {client?.email}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Date Joined: {new Date(client?.date_joined).toLocaleDateString()}
						</Typography>
						<Typography variant="body1" color="text.secondary" component="div">
							Status:
							<Chip
								label={client?.is_active ? "Active" : "Inactive"}
								size="small"
								color={client?.is_active ? "success" : "warning"}
								sx={{ mx: 1 }}
							/>
						</Typography>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileCard;
