import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, Card, CardContent, Box, AppBar, Tabs, Tab } from "@mui/material";

import TabPanel from "../../app/TabPanel/TabPanel";
import ProfileCard from "../ProfileCard/ProfileCard";
import ProfileCheckInList from "../ProfileCheckInList/ProfileCheckInList";
import ProfileWorkoutList from "../ProfileWorkoutList/ProfileWorkoutList";
import ProfilePlan from "../ProfilePlan/ProfilePlan";

const ProfileTabSections = ({ client, fetchClientUser }) => {
	const location = useLocation();
	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<AppBar position="static" color="transparent">
									<Tabs value={location.search} aria-label="check-in tabs">
										<Tab
											label="Profile"
											value={""}
											to={""}
											component={Link}
											id={`tab-${0}`}
											aria-controls={`tabpanel-${0}`}
											preventScrollReset={true}
										/>
										<Tab
											label="Plan"
											value={"?tab=plan"}
											to={"?tab=plan"}
											component={Link}
											id={`tab-${1}`}
											aria-controls={`tabpanel-${1}`}
											preventScrollReset={true}
										/>
										<Tab
											label="Check-Ins"
											value={"?tab=checkins"}
											to={"?tab=checkins"}
											component={Link}
											id={`tab-${2}`}
											aria-controls={`tabpanel-${1}`}
											preventScrollReset={true}
										/>
										<Tab
											label="Workouts"
											value={"?tab=workouts"}
											to={"?tab=workouts"}
											component={Link}
											id={`tab-${3}`}
											aria-controls={`tabpanel-${1}`}
											preventScrollReset={true}
										/>
									</Tabs>
								</AppBar>
							</Box>
							<TabPanel value={location.search} active={""} index={0}>
								<ProfileCard client={client} />
							</TabPanel>
							<TabPanel value={location.search} active={"?tab=plan"} index={1}>
								<ProfilePlan client={client} fetchClientUser={fetchClientUser} />
							</TabPanel>
							<TabPanel value={location.search} active={"?tab=checkins"} index={2}>
								<ProfileCheckInList userId={client?.id} />
							</TabPanel>
							<TabPanel value={location.search} active={"?tab=workouts"} index={3}>
								<ProfileWorkoutList planId={client?.training_plan?.id} fetchClientUser={fetchClientUser} />
							</TabPanel>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProfileTabSections;
