import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import RequestTable from "../../../components/admin/RequestTable/RequestTable";

const RequestsPage = () => {
	const { token } = useAuth();
	const [requests, setRequests] = useState([]);

	const fetchRequests = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/requests/all/",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
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
			<PageAppBar pageTitle={"Requests"} />
			<RequestTable requests={requests} fetchRequests={fetchRequests} />
		</div>
	);
};

export default RequestsPage;
