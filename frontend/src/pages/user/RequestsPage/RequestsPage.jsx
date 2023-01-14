import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import RequestForm from "../../../components/user/RequestForm/RequestForm";
import RequestList from "../../../components/user/RequestList/RequestList";
import TableSkeleton from "../../../components/app/TableSkeleton/TableSkeleton";

const RequestsPage = () => {
	const { token } = useAuth();
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchRequests = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/requests/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				const data = await response.data;
				setRequests(data);
				setLoading(false);
			}
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
			<PageToolbar pageTitle="My Requests">
				<RequestForm fetchRequests={fetchRequests} />
			</PageToolbar>
			{loading ? (
				<TableSkeleton />
			) : (
				<>
					<RequestList requests={requests} />
				</>
			)}
		</div>
	);
};

export default RequestsPage;
