import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const ProfileCard = ({ client }) => {
	return (
		<Card sx={{ p: 2 }}>
			<Stack rowGap={4}>
				<Box>
					<Typography variant="h6" color="text.primary">
						Profile Information
					</Typography>
					<Divider />
					<Stack spacing={1} sx={{ my: 2 }}>
						<Typography variant="body2" color="text.secondary">
							Username: {client?.username}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Email: {client?.email}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Date Joined: {new Date(client?.date_joined).toLocaleDateString()}
						</Typography>
						<Typography variant="body2" color="text.secondary" component="div">
							Status:
							<Chip
								label={client?.is_active ? "Active" : "Inactive"}
								size="small"
								color={client?.is_active ? "success" : "warning"}
								sx={{ mx: 1 }}
							/>
						</Typography>
					</Stack>
				</Box>
				<Box>
					<Typography variant="h6" color="text.primary">
						Training Plan
					</Typography>
					<Divider />
					<Stack spacing={1} sx={{ my: 2 }}>
						<Typography variant="body2" color="text.secondary">
							Goal: {client?.training_plan.goal}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Cost: {client?.training_plan.cost}
						</Typography>
					</Stack>
				</Box>
			</Stack>
		</Card>
	);
};

export default ProfileCard;
