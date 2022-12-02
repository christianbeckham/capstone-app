import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { apiExercises } from "../../utils/exercisedata";

const ExercisePage = () => {
	const [user, token] = useAuth();
	const { exerciseId } = useParams();
	const [exercise, setExercise] = useState({});

	useEffect(() => {
		try {
			const response = axios
				.get(`http://localhost:8000/api/exercises/${exerciseId}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					const exercise = apiExercises.filter(
						(ex) => ex.name === res.data.name
					);
					if (res.status === 200) setExercise({ ...exercise[0], ...res.data });
					console.log({ ...exercise[0], ...res.data });
				});
			if (response.status === 200) {
				console.log(exercise);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<h1>Exercise Details</h1>
			<p>Name: {exercise.name}</p>
			<p>Sets: {exercise.sets}</p>
			<p>Reps: {exercise.reps}</p>
			<p>Target: {exercise.target}</p>
			<p>Body Part: {exercise.bodyPart}</p>
			<p>Equipment: {exercise.equipment}</p>
			<img height={350} width={350} src={exercise.gifUrl} alt={exercise.name} />
		</>
	);
};

export default ExercisePage;
