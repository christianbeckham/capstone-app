import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import WorkoutList from "../../../components/user/WorkoutList/WorkoutList";

const WorkoutsPage = () => {
	const { token } = useAuth();
	const [planId, setPlanId] = useState(null);
	const [workouts, setWorkouts] = useState([]);

	const fetchPlan = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/plans/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) setPlanId(response.data[0].id);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchWorkouts = async (itemId) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/workouts/?plan_id=${itemId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) setWorkouts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPlan();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (planId) fetchWorkouts(planId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planId]);

	useEffect(() => {}, []);

	return (
		<div>
			<PageToolbar pageTitle={"My Workouts"} />
			{workouts.length > 0 ? <WorkoutList workouts={workouts} /> : <p>No workouts available</p>}
		</div>
	);
};

export default WorkoutsPage;
