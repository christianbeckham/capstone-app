import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import CheckInList from "../../components/CheckInList/CheckInList";

const MyCheckIns = () => {
	const [user, token] = useAuth();
	const [checkins, setCheckins] = useState([]);

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
			<Button variant="outlined" component={Link} to="new">
				New Check-in
			</Button>
			<CheckInList checkins={checkins} />
		</div>
	);
};

export default MyCheckIns;
