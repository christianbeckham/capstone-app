import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";

const ProfilePage = () => {
	const { token } = useAuth();
	const [profile, setProfile] = useState({});

	const fetchProfile = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/auth/me/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				console.log("Profile info", response.data);
				setProfile(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<PageToolbar pageTitle={"Profile"} />
			<Card>
				<Grid container rowSpacing={2}>
					<Grid item xs={12}>
						<Typography component="h2" variant="h4">
							My Information
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1} sx={{ my: 2 }}>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Username:
								</Typography>
								<Typography component="p" variant="body1">
									{profile.username}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Email:
								</Typography>
								<Typography component="p" variant="body1">
									{profile.email}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Name:
								</Typography>
								<Typography component="p" variant="body1">
									{profile.full_name}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Date Joined:
								</Typography>
								<Typography component="p" variant="body1">
									{profile?.date_joined &&
										new Date(profile?.date_joined).toLocaleDateString()}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Status:
								</Typography>
								<Chip
									label={profile?.is_active ? "Active" : "Inactive"}
									size="small"
									color={profile?.is_active ? "success" : "warning"}
									sx={{ mx: 1 }}
								/>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography component="p" variant="h6" color="text.secondary">
									Plan Cost:
								</Typography>
								<Typography component="p" variant="body1">
									$ {profile.training_plan?.cost}
								</Typography>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default ProfilePage;
