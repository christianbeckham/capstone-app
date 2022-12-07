import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";

import useAuth from "../../hooks/useAuth";
import ClientsTable from "../../components/admin/ClientsTable/ClientsTable";

const AdminClients = () => {
	const [user, token] = useAuth();
	const [clients, setClients] = useState([]);

	useEffect(() => {
		try {
			const fetchClients = async () => {
				const response = await axios.get(
					"http://localhost:8000/api/auth/clients/",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (response.status === 200) {
					setClients(response.data);
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
				<ClientsTable clients={clients} />
			) : (
				<p>No clients</p>
			)}
		</div>
	);
};

export default AdminClients;
