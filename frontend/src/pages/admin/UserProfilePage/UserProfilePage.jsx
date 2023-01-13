import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import EditProfileOptions from "../../../components/admin/EditProfileOptions/EditProfileOptions";
import ProfileTabSections from "../../../components/admin/ProfileTabSections/ProfileTabSections";

const UserProfilePage = () => {
	const { token } = useAuth();
	const { clientId } = useParams();
	const [client, setClient] = useState(null);

	const fetchClientUser = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/auth/clients/${clientId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setClient(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClientUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<PageToolbar pageTitle={`${client?.first_name} ${client?.last_name}`}>
				<EditProfileOptions client={client} fetchClientUser={fetchClientUser} />
			</PageToolbar>
			<ProfileTabSections client={client} fetchClientUser={fetchClientUser} />
		</>
	);
};

export default UserProfilePage;
