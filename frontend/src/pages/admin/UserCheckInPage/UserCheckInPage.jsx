import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import TabPanel from "../../../components/app/TabPanel/TabPanel";
import ImagePreviewList from "../../../components/admin/ImagePreviewList/ImagePreviewList";

const UserCheckInPage = () => {
	const { token } = useAuth();
	const { checkinId } = useParams();
	const [userCheckIn, setUserCheckIn] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({ trainer_feedback: "" });
	const location = useLocation();

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchCheckIn = async (itemId) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/all/${itemId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
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
			const response = await axios.patch(`http://localhost:8000/api/checkins/all/${itemId}/`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (error) {}
	};

	return (
		<div>
			<PageToolbar pageTitle={"Check-In Details"} />
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Card>
						<CardContent>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<AppBar position="static" color="transparent">
									<Tabs value={location.search} aria-label="check-in tabs">
										<Tab
											label="Overview"
											value={""}
											to={""}
											component={Link}
											id={`tab-${0}`}
											aria-controls={`tabpanel-${0}`}
											preventScrollReset={true}
										/>
										<Tab
											label="Images"
											value={"?tab=images"}
											to={"?tab=images"}
											component={Link}
											id={`tab-${1}`}
											aria-controls={`tabpanel-${1}`}
											preventScrollReset={true}
										/>
									</Tabs>
								</AppBar>
							</Box>
							<TabPanel value={location.search} active={""} index={0}>
								<Stack spacing={1}>
									<Typography component="p" variant="body1">
										Name: {userCheckIn?.user?.full_name}
									</Typography>
									<Typography component="p" variant="body1">
										Date: {new Date(userCheckIn?.created_date).toLocaleDateString()}
									</Typography>
									<Typography component="p" variant="body1">
										Weight: {userCheckIn?.weight} lbs
									</Typography>
									<Typography component="p" variant="body1">
										Review: {userCheckIn?.weekly_review}
									</Typography>
								</Stack>
							</TabPanel>
							<TabPanel value={location.search} active={"?tab=images"} index={1}>
								<div>
									{userCheckIn?.images?.length > 0 ? (
										<ImagePreviewList images={userCheckIn?.images} />
									) : (
										<Typography>No images</Typography>
									)}
								</div>
							</TabPanel>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader title={"Feedback"} />
						<CardContent>
							<Box component={"form"} onSubmit={handleFormSubmit}>
								<TextField
									disabled={!editMode}
									fullWidth
									variant="outlined"
									type="text"
									// label="Feedback"
									name="trainer_feedback"
									value={formData.trainer_feedback || ""}
									onChange={handleInputChange}
									multiline
									rows={12}
									focused={editMode}
								/>
								<CardActions>
									{editMode ? (
										<Stack direction={"row"} spacing={1}>
											<Button disabled={!editMode} variant="outlined" color="error" onClick={handleFormCancel}>
												Cancel
											</Button>
											<Button disabled={!editMode} type="submit" color="success">
												Submit
											</Button>
										</Stack>
									) : (
										<Button onClick={toggleEditMode}>{formData.trainer_feedback.length > 0 ? "Edit" : "Add"}</Button>
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
