import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import PageAppBar from "../../../components/app/PageToolbar/PageToolbar";
import ClientsTable from "../../../components/admin/ClientsTable/ClientsTable";
import TableSkeleton from "../../../components/app/TableSkeleton/TableSkeleton";

const ClientsPage = () => {
	const { token } = useAuth();
	const [clients, setClients] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const fetchClients = async () => {
				const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/auth/clients/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.status === 200) {
					setClients(response.data);
				}
				setLoading(false);
			};
			fetchClients();
		} catch (error) {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PageAppBar pageTitle={"Clients"} />
			{loading ? <TableSkeleton /> : <>{clients.length > 0 ? <ClientsTable clients={clients} /> : <p>No clients</p>}</>}
		</div>
	);
};

export default ClientsPage;
