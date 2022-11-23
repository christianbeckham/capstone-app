import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

import useAuth from "../../hooks/useAuth";
import CheckInForm from "../../components/CheckInForm/CheckInForm";
import CheckInList from "../../components/CheckInList/CheckInList";

const MyCheckIns = () => {
	const [user, token] = useAuth();
	const [checkins, setCheckins] = useState([]);
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => setShowForm(!showForm);

	useEffect(() => {
		const fetchCheckIns = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/checkins/",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.status === 200) {
					const data = await response.data;
					setCheckins(data);
				}
			} catch (e) {
				console.log({ error: e });
			}
		};

		fetchCheckIns();
	}, []);

	return (
		<div>
			<h1>My Check-Ins</h1>
			<br />
			<Button variant="outlined" startIcon={<Add />} onClick={toggleForm}>
				New
			</Button>
			{showForm && <CheckInForm showForm={showForm} toggleForm={toggleForm} />}
			<br />
			<br />
			<CheckInList checkins={checkins} />
		</div>
	);
};

export default MyCheckIns;
