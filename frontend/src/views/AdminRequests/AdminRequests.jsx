import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import RequestTable from "../../components/admin/RequestTable/RequestTable";

const AdminRequests = () => {
	const [user, token] = useAuth();
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
			<h1>Admin Requests View</h1>
			<br />
			<RequestTable requests={requests} fetchRequests={fetchRequests} />
		</div>
	);
};

export default AdminRequests;
