import React, { useState } from "react";
import { Link } from 'react-router-dom';
import WorkoutListItem from "../WorkoutListItem/WorkoutListItem";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";

const WorkoutList = ({ workouts }) => {
	const [value, setValue] = useState(0);
	const [exercises, setExercises] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const setProps = (index) => {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	};

	useEffect(() => {
		if (workouts !== undefined) {
			const workout = workouts.sort((a, b) => a.assigned_day - b.assigned_day);

			if (workout.length > 0) {
				setExercises(workout[0].exercise_set);
				setLoading(false);
			}
		}
	}, [workouts]);

	const getWorkouts = (day) => {
		console.log("day", day);
    const exercises = workouts.filter(w => w.assigned_day === day)
    setExercises(exercises[0].exercise_set);
    console.log(exercises[0].exercise_set);
	};

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : workouts ? (
				<>
					{workouts
						.sort((a, b) => a.assigned_day - b.assigned_day)
						.map((workout) => (
							<button
								key={workout.id}
								onClick={() => getWorkouts(workout.assigned_day)}
							>
								Day {workout.assigned_day}
							</button>
						))}

					<div>
						{exercises.map((e) => (
							<div key={e.id}>
								<Link to={`/exercise/${e.id}`}>{e.name}</Link>
							</div>
						))}
					</div>
					{/* <Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{workouts
							.sort((a, b) => a.assigned_day - b.assigned_day)
							.map((workout) => (
								<Tab
									key={workout.id}
									index={workout.id}
									label={`Day ${workout.assigned_day}`}
									{...setProps(0)}
									onClick={() => setExercises(workout.exercise_set)}
								/>
							))}
					</Tabs>
					<div>
						{exercises.length > 0 ? (
							<WorkoutListItem
								key={value}
								value={value}
								index={value}
								exercises={exercises}
							/>
						) : (
							<p key={value}>No exercises...</p>
						)}
					</div> */}
				</>
			) : (
				<p>No workouts</p>
			)}
		</div>
	);
};

export default WorkoutList;
