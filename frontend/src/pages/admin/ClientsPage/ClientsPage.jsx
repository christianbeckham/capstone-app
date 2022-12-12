import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import ClientsTable from "../../../components/admin/ClientsTable/ClientsTable";

const ClientsPage = () => {
	const { token } = useAuth();
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
			<PageAppBar pageTitle={"Clients"} />
			{clients.length > 0 ? (
				<ClientsTable clients={clients} />
			) : (
				<p>No clients</p>
			)}
		</div>
	);
};

export default ClientsPage;
