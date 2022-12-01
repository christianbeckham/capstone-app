import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";

const UserCheckInPage = () => {
	const [user, token] = useAuth();
	const { checkinId } = useParams();
	const [checkin, setCheckin] = useState({});

	useEffect(() => {
		try {
			const fetchCheckIn = async () => {
				const response = await axios.get(
					`http://localhost:8000/api/checkins/${checkinId}/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (response.status === 200) {
					setCheckin(response.data);
				}
			};
			fetchCheckIn();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div>
			<h1>Check-In</h1>
			<br />
			<p>Date: {new Date(checkin.created_date).toLocaleDateString()}</p>
			<p>Weight: {checkin.weight}</p>
			<p>Weely Review: {checkin.weekly_review}</p>
			{checkin.trainer_feedback && (
				<p>Trainer Feedback: {checkin.trainer_feedback}</p>
			)}
			<br />
			<h2>Images</h2>
			{checkin.images && checkin.images.length > 0 ? (
				checkin.images.map((img, index) => (
					<img
						key={index}
						src={`http://localhost:8000${img.image}`}
						alt={img.title}
						width="200"
					/>
				))
			) : (
				<p>No images...</p>
			)}
		</div>
	);
};

export default UserCheckInPage;
