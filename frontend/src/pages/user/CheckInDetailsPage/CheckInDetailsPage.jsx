import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import UploadImagesButton from "../../../components/user/UploadImagesButton/UploadImagesButton";
import ImagePreviewList from "../../../components/user/ImagePreviewList/ImagePreviewList";

const TabPanel = (props) => {
	const { children, value, active, index } = props;
	return (
		<div role="tabpanel" hidden={value !== active} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
			{value === active && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

const CheckInDetailsPage = () => {
	const { token } = useAuth();
	const { checkinId } = useParams();
	const [checkin, setCheckin] = useState({});
	const location = useLocation();

	const fetchCheckIn = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/${checkinId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setCheckin(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCheckIn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PageToolbar pageTitle={`Check-In Details`} />
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Card>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<AppBar position="static" color="transparent">
								<Tabs value={location.search} aria-label="basic tabs example">
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
							<div>
								<Stack direction="row" spacing={2}>
									<Typography component="p" variant="body1" gutterBottom>
										Date:
									</Typography>
									<Typography component="p" variant="body1" gutterBottom>
										{new Date(checkin.created_date).toLocaleDateString()}
									</Typography>
								</Stack>
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
									<Typography component="p" variant="body1" gutterBottom>
										{checkin.weekly_review}
									</Typography>
								</Stack>
							</div>
						</TabPanel>
						<TabPanel value={location.search} active={"?tab=images"} index={1}>
							<div>
								<UploadImagesButton checkinId={checkinId} fetchCheckIn={fetchCheckIn} />
								<Stack direction="row" spacing={1}>
									{checkin?.images && checkin?.images?.length > 0 ? (
										<ImagePreviewList images={checkin?.images} />
									) : (
										<p>No images</p>
									)}
								</Stack>
							</div>
						</TabPanel>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader title={"Trainer Feedback"} />
						<CardContent>
							{checkin.trainer_feedback ? <p>{checkin.trainer_feedback}</p> : <p>No feedback</p>}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default CheckInDetailsPage;
