import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WorkoutList = ({ workouts }) => {
	const [exercises, setExercises] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (workouts !== undefined) {
			const workout = workouts.sort((a, b) => a.assigned_day - b.assigned_day);

			if (workout.length > 0) {
				setExercises(workout[0].exercises);
				setLoading(false);
			}
		}
	}, [workouts]);

	const getWorkouts = (day) => {
		console.log("day", day);
		const exercises = workouts.filter((w) => w.assigned_day === day);
		setExercises(exercises[0].exercises);
		console.log(exercises[0].exercises);
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
				</>
			) : (
				<p>No workouts</p>
			)}
		</div>
	);
};

export default WorkoutList;
