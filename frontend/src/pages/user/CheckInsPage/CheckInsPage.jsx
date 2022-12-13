import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import CheckInForm from "../../../components/user/CheckInForm/CheckInForm";
import CheckInList from "../../../components/user/CheckInList/CheckInList";

const CheckInsPage = () => {
	const { token } = useAuth();
	const [checkIns, setCheckIns] = useState([]);

	const fetchCheckIns = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/checkins/", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				const data = await response.data;
				setCheckIns(data);
			}
		} catch (e) {
			console.log({ error: e });
		}
	};

	useEffect(() => {
		fetchCheckIns();
	}, []);

	return (
		<div>
			<PageToolbar pageTitle="My Check-Ins">
				<CheckInForm fetchCheckIns={fetchCheckIns} />
			</PageToolbar>
			<CheckInList checkIns={checkIns} />
		</div>
	);
};

export default CheckInsPage;
