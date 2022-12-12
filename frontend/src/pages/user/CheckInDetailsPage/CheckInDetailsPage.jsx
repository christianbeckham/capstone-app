import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";

const CheckInDetailsPage = () => {
	const { token } = useAuth();
	const { checkinId } = useParams();
	const [checkin, setCheckin] = useState({});

	useEffect(() => {
		try {
			const fetchCheckIn = async () => {
				const response = await axios.get(
					`http://localhost:8000/api/checkins/${checkinId}/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (response.status === 200) {
					setCheckin(response.data);
				}
			};
			fetchCheckIn();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div>
			<PageToolbar pageTitle={`Check-In Details`} />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Card>
						<Stack
							direction="row"
							alignItems={"center"}
							justifyContent={"space-between"}
							spacing={2}
							sx={{ mb: 2 }}
						>
							<CardHeader title={"Overview"} />
							<Typography
								gutterBottom
								variant="overline"
								sx={{ color: "text.disabled", display: "block" }}
							>
								{new Date(checkin.created_date).toLocaleDateString()}
							</Typography>
						</Stack>
						<CardContent>
							<Stack direction="row" spacing={2}>
								<Typography component="p" variant="body1" gutterBottom>
									Weight:
								</Typography>
								<Typography component="p" variant="body1" gutterBottom>
									{checkin.weight} lbs
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography component="p" variant="body1" gutterBottom>
									Review:
								</Typography>
								<Typography component="p" variant="body2" gutterBottom>
									{checkin.weekly_review}
								</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader title={"Trainer Feedback"} />
						<CardContent>
							{checkin.trainer_feedback ? (
								<p>Trainer Feedback: {checkin.trainer_feedback}</p>
							) : (
								<p>No feedback</p>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader title={"Images"} />
						<CardContent>
							{checkin.images && checkin.images.length > 0 ? (
								checkin.images.map((img, index) => (
									<img
										key={index}
										src={`http://localhost:8000${img.image}`}
										alt={img.title}
										width="200"
									/>
								))
							) : (
								<p>No images</p>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default CheckInDetailsPage;
