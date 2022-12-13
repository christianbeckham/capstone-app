import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";

const UserCheckInPage = () => {
	const { token } = useAuth();
	const { checkinId } = useParams();
	const [userCheckIn, setUserCheckIn] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({ trainer_feedback: "" });

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const handleInputChange = (e) => {
		console.log({ [e.target.name]: e.target.value });
		setFormData({ [e.target.name]: e.target.value });
	};

	const handleFormCancel = () => {
		setFormData({ trainer_feedback: userCheckIn.trainer_feedback });
		setEditMode(false);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		postFeedback(checkinId, formData);
		setEditMode(false);
	};

	useEffect(() => {
		fetchCheckIn(checkinId);
	}, []);

	const fetchCheckIn = async (itemId) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/checkins/all/${itemId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
				setUserCheckIn(response.data);
				setFormData({ trainer_feedback: response.data.trainer_feedback });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postFeedback = async (itemId, data) => {
		try {
			const response = await axios.patch(
				`http://localhost:8000/api/checkins/all/${itemId}/`,
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (error) {}
	};

	return (
		<div>
			<PageToolbar pageTitle={"Check-In Details"} />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card>
								<CardHeader title={"Overview"} />
								<CardContent>
									<Stack spacing={1}>
										<Typography component="p" variant="body1">
											Name: {userCheckIn?.user?.full_name}
										</Typography>
										<Typography component="p" variant="body1">
											Date:{" "}
											{new Date(userCheckIn?.created_date).toLocaleDateString()}
										</Typography>
										<Typography component="p" variant="body1">
											Weight: {userCheckIn?.weight} lbs
										</Typography>
										<Typography component="p" variant="body1">
											Review: {userCheckIn?.weekly_review}
										</Typography>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12}>
							<Card>
								<CardHeader title={"Images"} />
								<CardContent>
									{userCheckIn?.images?.length > 0 && (
										<Stack
											direction="row"
											justifyContent={"space-around"}
											spacing={1}
											sx={{ overflow: "hidden" }}
										>
											{userCheckIn?.images.map((img) => (
												<img
													key={img.id}
													src={`http://localhost:8000${img.image}`}
													alt={img.title}
													width={200}
												/>
											))}
										</Stack>
									)}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader title={"Feedback"} />
						<CardContent>
							<Box component={"form"} onSubmit={handleFormSubmit}>
								<TextField
									disabled={!editMode}
									fullWidth
									variant="standard"
									type="text"
									label="Feedback"
									name="trainer_feedback"
									value={formData.trainer_feedback || ""}
									onChange={handleInputChange}
									multiline
									rows={12}
									focused={editMode}
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<CardActions>
									{editMode ? (
										<Stack direction={"row"} spacing={1}>
											<Button
												disabled={!editMode}
												type="submit"
												variant="contained"
												color="success"
											>
												Submit
											</Button>
											<Button
												disabled={!editMode}
												variant="contained"
												color="error"
												onClick={handleFormCancel}
											>
												Cancel
											</Button>
										</Stack>
									) : (
										<Button variant="contained" onClick={toggleEditMode}>
											{formData.trainer_feedback.length > 0 ? "Edit" : "Add"}
										</Button>
									)}
								</CardActions>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default UserCheckInPage;
