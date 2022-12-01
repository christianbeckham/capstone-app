import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import useAuth from "../../hooks/useAuth";

const AdminUserCheckInPage = () => {
	const [user, token] = useAuth();
	const { checkinId } = useParams();
	const [userCheckIn, setUserCheckIn] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({ trainer_feedback: "" });

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const handleInputChange = (e) => {
		console.log({ [e.target.name]: e.target.value });
		setFormData({ [e.target.name]: e.target.value });
	};

	const handleFormCancel = () => {
		setFormData({ trainer_feedback: userCheckIn.trainer_feedback });
		setEditMode(false);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		postFeedback(checkinId, formData);
		setEditMode(false);
	};

	useEffect(() => {
		fetchCheckIn(checkinId);
	}, []);

	const fetchCheckIn = async (itemId) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/checkins/all/${itemId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
				setUserCheckIn(response.data);
				setFormData({ trainer_feedback: response.data.trainer_feedback });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postFeedback = async (itemId, data) => {
		try {
			const response = await axios.patch(
				`http://localhost:8000/api/checkins/all/${itemId}/`,
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (error) {}
	};

	return (
		<div>
			<h1>Admin User Check-in Page </h1>
			<p>Check-In: {userCheckIn?.user?.full_name}</p>
			<br />
			<p>Date: {new Date(userCheckIn?.created_date).toLocaleDateString()}</p>
			<p>Weight: {userCheckIn?.weight}</p>
			<p>Weekly Review: {userCheckIn?.weekly_review}</p>
			<br />

			{userCheckIn?.images?.length > 0 && (
				<div>
					<p>Images:</p>
					{userCheckIn?.images.map((img) => (
						<img
							key={img.id}
							src={`http://localhost:8000${img.image}`}
							alt={img.title}
							width={200}
						/>
					))}
				</div>
			)}
			<Button variant="contained" onClick={toggleEditMode}>
				Provide Feedback
			</Button>
			<Box component={"form"} onSubmit={handleFormSubmit}>
				<TextField
					disabled={!editMode}
					fullWidth
					variant="standard"
					type="text"
					label="Feedback"
					name="trainer_feedback"
					value={formData.trainer_feedback || ""}
					onChange={handleInputChange}
					multiline
					rows={4}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Stack direction={"row"} spacing={1}>
					<Button
						disabled={!editMode}
						type="submit"
						variant="contained"
						color="success"
					>
						Submit
					</Button>
					<Button
						disabled={!editMode}
						variant="contained"
						color="error"
						onClick={handleFormCancel}
					>
						Cancel
					</Button>
				</Stack>
			</Box>
		</div>
	);
};

export default AdminUserCheckInPage;
