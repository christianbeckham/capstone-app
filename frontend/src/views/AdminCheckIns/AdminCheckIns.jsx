import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import CheckInTable from "../../components/admin/CheckInTable/CheckInTable";

const AdminCheckIns = () => {
	const [user, token] = useAuth();
	const [checkins, setCheckins] = useState([]);

	const fetchCheckIns = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/checkins/all/",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				const data = await response.data;
				setCheckins(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCheckIns();
	}, []);

	return (
		<div>
			<h1>Admin Check-Ins</h1>
			<br />
			<CheckInTable checkins={checkins} fetchCheckIns={fetchCheckIns} />
		</div>
	);
};

export default AdminCheckIns;
