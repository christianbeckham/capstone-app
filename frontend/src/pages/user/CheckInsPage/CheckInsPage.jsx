import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import CheckInForm from "../../../components/user/CheckInForm/CheckInForm";
import CheckInList from "../../../components/user/CheckInList/CheckInList";
import TableSkeleton from "../../../components/app/TableSkeleton/TableSkeleton";

const CheckInsPage = () => {
	const { token } = useAuth();
	const [checkIns, setCheckIns] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchCheckIns = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				const data = await response.data;
				setCheckIns(data);
				setLoading(false);
			}
		} catch (e) {
			console.log({ error: e });
		}
	};

	useEffect(() => {
		fetchCheckIns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PageToolbar pageTitle="My Check-Ins">
				<CheckInForm fetchCheckIns={fetchCheckIns} />
			</PageToolbar>
			{loading ? (
				<TableSkeleton />
			) : (
				<>
					<CheckInList checkIns={checkIns} />
				</>
			)}
		</div>
	);
};

export default CheckInsPage;
