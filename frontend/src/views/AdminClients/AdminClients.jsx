import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";

import useAuth from "../../hooks/useAuth";
import AdminClientList from "../../components/admin/AdminClientList/AdminClientList";

const AdminClients = () => {
	const [clients, setClients] = useState([]);
	const [user, token] = useAuth();

	useEffect(() => {
		try {
			const fetchClients = async () => {
				const response = await axios.get("http://localhost:8000/api/clients/", {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.status === 200) {
					setClients(response.data);
					console.log(response.data);
				}
			};
			fetchClients();
		} catch (error) {}
	}, []);

	return (
		<div>
			<Typography variant="h5" color="text.primary">
				All Clients
			</Typography>
			<br />
			{clients.length > 0 ? (
				<AdminClientList clients={clients} />
			) : (
				<p>No clients</p>
			)}
		</div>
	);
};

export default AdminClients;
