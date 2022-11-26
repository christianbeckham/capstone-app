import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import WorkoutList from "../../components/WorkoutList/WorkoutList";

const MyWorkouts = () => {
	const [user, token] = useAuth();
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const workouts = await axios
					.get("http://localhost:8000/api/plans/", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						const response = axios.get(
							`http://localhost:8000/api/workouts/?plan_id=${res.data[0].id}`,
							{
								headers: {
									Authorization: `Bearer ${token}`,
									"Content-Type": "application/json",
								},
							}
						);
						return response;
					});

				if (workouts.status === 200) {
					const data = await workouts.data;
					console.log(data);
					setWorkouts(data);
				}
			} catch (e) {
				console.log({ error: e.message });
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>My Workouts</h1>
			<WorkoutList workouts={workouts} />
		</div>
	);
};

export default MyWorkouts;
