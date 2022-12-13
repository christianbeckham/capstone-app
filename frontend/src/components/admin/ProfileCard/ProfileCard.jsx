import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import NewPlanModal from "../NewPlanModal/NewPlanModal";

const ProfileCard = ({ client, fetchClientUser }) => {
	return (
		<Stack spacing={2}>
			<Card>
				<CardHeader title={"Profile Information"} />
				<CardContent>
					<Stack spacing={1}>
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
				</CardContent>
			</Card>
			<Card>
				<Stack
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<CardHeader title={"Training Plan"} />
					{client?.training_plan?.cost && (
						<Typography variant="caption" color="text.secondary">
							$ {client?.training_plan?.cost}
						</Typography>
					)}
				</Stack>
				<CardContent>
					<Stack spacing={1}>
						{client?.training_plan?.goal && (
							<Typography variant="body2" color="text.secondary">
								{client?.training_plan?.goal}
							</Typography>
						)}
						{!client?.training_plan && (
							<NewPlanModal
								userId={client?.id}
								fetchClientUser={fetchClientUser}
							/>
						)}
					</Stack>
				</CardContent>
			</Card>
		</Stack>
	);
};

export default ProfileCard;
