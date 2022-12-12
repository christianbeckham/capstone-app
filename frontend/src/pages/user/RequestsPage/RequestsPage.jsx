import React from "react";

import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import RequestForm from "../../../components/user/RequestForm/RequestForm";
import RequestList from "../../../components/user/RequestList/RequestList";

const RequestsPage = () => {
	return (
		<div>
			<PageToolbar pageTitle="My Requests">
				<RequestForm />
			</PageToolbar>
			<RequestList />
		</div>
	);
};

export default RequestsPage;
