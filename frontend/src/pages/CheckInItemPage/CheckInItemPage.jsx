import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";

const CheckInItemPage = () => {
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
			<p>Check-In Item Page</p>
			<p>check-in id: {checkinId}</p>
			<br />
			<p>Date: {new Date(checkin.created_date).toLocaleDateString()}</p>
			<p>Weight: {checkin.weight}</p>
			<p>Feedback: {checkin.feedback}</p>
			{checkin.checkinimage_set && checkin.checkinimage_set.length > 0 ? (
				checkin.checkinimage_set.map((img, index) => (
					<img
						key={index}
						src={`http://localhost:8000${img.image}`}
						alt={img.title}
					/>
				))
			) : (
				<p>No images...</p>
			)}
		</div>
	);
};

export default CheckInItemPage;
