import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import CheckInTable from "../../../components/admin/CheckInTable/CheckInTable";
import TableSkeleton from "../../../components/app/TableSkeleton/TableSkeleton";

const CheckInsPage = () => {
	const { token } = useAuth();
	const [checkins, setCheckins] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchCheckIns = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/all/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				const data = await response.data;
				setCheckins(data);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCheckIns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PageAppBar pageTitle={"Check-Ins"} />
			{loading ? (
				<TableSkeleton />
			) : (
				<>
					<CheckInTable checkins={checkins} fetchCheckIns={fetchCheckIns} />
				</>
			)}
		</div>
	);
};

export default CheckInsPage;
