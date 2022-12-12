import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import useAuth from "../../../hooks/useAuth";
import ProfileCard from "../../../components/admin/ProfileCard/ProfileCard";
import ProfileCheckInList from "../../../components/admin/ProfileCheckInList/ProfileCheckInList";
import ProfileWorkoutList from "../../../components/admin/ProfileWorkoutList/ProfileWorkoutList";
import EditProfileOptions from "../../../components/admin/EditProfileOptions/EditProfileOptions";

const UserProfilePage = () => {
	const { token } = useAuth();
	const { clientId } = useParams();
	const [client, setClient] = useState(null);

	const fetchClientUser = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/auth/clients/${clientId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
				setClient(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClientUser();
	}, []);

	return (
		<div>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: 2,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Avatar
						sx={{ height: 56, width: 56, m: 2 }}
						variant="circular"
						src="avatar1.jpg"
					/>
					<Typography variant="h4" color="text.primary">
						{client?.first_name} {client?.last_name}
					</Typography>
					<Stack direction={"row"} spacing={2} sx={{ mx: 4 }}>
						<Box sx={{ position: "relative", display: "flex" }}>
							<CircularProgress
								variant="determinate"
								size="5rem"
								thickness={3}
								value={100}
							/>
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Stack alignItems={"center"}>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
									>
										2,400
									</Typography>
									<Typography
										variant="caption"
										component="div"
										color="text.secondary"
									>
										calories
									</Typography>
								</Stack>
							</Box>
						</Box>
						<Box sx={{ position: "relative", display: "flex" }}>
							<CircularProgress
								variant="determinate"
								size="5rem"
								thickness={3}
								value={100}
							/>
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Stack alignItems={"center"}>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
									>
										120g
									</Typography>
									<Typography
										variant="caption"
										component="div"
										color="text.secondary"
									>
										protein
									</Typography>
								</Stack>
							</Box>
						</Box>
						<Box sx={{ position: "relative", display: "flex" }}>
							<CircularProgress
								variant="determinate"
								size="5rem"
								thickness={3}
								value={100}
							/>
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Stack alignItems={"center"}>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
									>
										185g
									</Typography>
									<Typography
										variant="caption"
										component="div"
										color="text.secondary"
									>
										carbs
									</Typography>
								</Stack>
							</Box>
						</Box>
						<Box sx={{ position: "relative", display: "flex" }}>
							<CircularProgress
								variant="determinate"
								size="5rem"
								thickness={3}
								value={100}
							/>
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Stack alignItems={"center"}>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
									>
										70g
									</Typography>
									<Typography
										variant="caption"
										component="div"
										color="text.secondary"
									>
										fats
									</Typography>
								</Stack>
							</Box>
						</Box>
					</Stack>
				</Box>
				<Box>
					<EditProfileOptions
						client={client}
						fetchClientUser={fetchClientUser}
					/>
				</Box>
			</Box>
			<Divider />
			<br />
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<ProfileCard client={client} />
				</Grid>
				<Grid item xs={4}>
					<ProfileCheckInList userId={clientId} />
				</Grid>
				<Grid item xs={4}>
					<ProfileWorkoutList
						planId={client?.training_plan?.id}
						fetchClientUser={fetchClientUser}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default UserProfilePage;
