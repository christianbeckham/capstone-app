import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import RequestForm from "../../../components/user/RequestForm/RequestForm";
import RequestList from "../../../components/user/RequestList/RequestList";

const RequestsPage = () => {
	const { token } = useAuth();
	const [requests, setRequests] = useState([]);

	const fetchRequests = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/requests/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				const data = await response.data;
				setRequests(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	return (
		<div>
			<PageToolbar pageTitle="My Requests">
				<RequestForm fetchRequests={fetchRequests} />
			</PageToolbar>
			<RequestList requests={requests} />
		</div>
	);
};

export default RequestsPage;
