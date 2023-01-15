import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import RequestTable from "../../../components/admin/RequestTable/RequestTable";
import TableSkeleton from "../../../components/app/TableSkeleton/TableSkeleton";

const RequestsPage = () => {
	const { token } = useAuth();
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchRequests = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/requests/all/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				const data = await response.data;
				setRequests(data);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PageAppBar pageTitle={"Requests"} />
			{loading ? (
				<TableSkeleton />
			) : (
				<>
					<RequestTable requests={requests} fetchRequests={fetchRequests} />
				</>
			)}
		</div>
	);
};

export default RequestsPage;
