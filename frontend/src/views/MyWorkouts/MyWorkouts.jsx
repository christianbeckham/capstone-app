import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import WorkoutList from "../../components/user/WorkoutList/WorkoutList";

const MyWorkouts = () => {
	const [user, token] = useAuth();
	const [planId, setPlanId] = useState(null);
	const [workouts, setWorkouts] = useState([]);

	const fetchPlan = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/plans/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) setPlanId(response.data[0].id);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchWorkouts = async (itemId) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/workouts/?plan_id=${itemId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) setWorkouts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPlan();
	}, []);

	useEffect(() => {
		fetchWorkouts(planId);
	}, [planId]);

	return (
		<div>
			<h1>My Workouts</h1>
			<WorkoutList workouts={workouts} />
		</div>
	);
};

export default MyWorkouts;
