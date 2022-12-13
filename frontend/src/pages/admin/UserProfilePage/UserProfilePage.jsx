import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import ProfileCard from "../../../components/admin/ProfileCard/ProfileCard";
import ProfileCheckInList from "../../../components/admin/ProfileCheckInList/ProfileCheckInList";
import ProfileWorkoutList from "../../../components/admin/ProfileWorkoutList/ProfileWorkoutList";
import EditProfileOptions from "../../../components/admin/EditProfileOptions/EditProfileOptions";
import InfoRing from "../../../components/app/InfoRing/InfoRing";

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
			<PageToolbar pageTitle={`${client?.first_name} ${client?.last_name}`}>
				<EditProfileOptions client={client} fetchClientUser={fetchClientUser} />
			</PageToolbar>
			<Divider />
			<br />
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<ProfileCard client={client} fetchClientUser={fetchClientUser} />
				</Grid>
				<Grid item xs={4}>
					<Grid item container spacing={2}>
						<Grid item xs={12}>
							<Card>
								<CardHeader title={"Macros"} />
								<CardContent>
									<Stack direction="row" spacing={1}>
										<InfoRing
											text="calories"
											value={client?.training_plan?.calories}
										/>
										<InfoRing
											text="protein"
											value={`${client?.training_plan?.protein}g`}
										/>
										<InfoRing
											text="carbs"
											value={`${client?.training_plan?.carbs}g`}
										/>
										<InfoRing
											text="fats"
											value={`${client?.training_plan?.fats}g`}
										/>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12}>
							<ProfileCheckInList userId={clientId} />
						</Grid>
					</Grid>
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
