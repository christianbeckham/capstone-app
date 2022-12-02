import React, { useState } from "react";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

import RequestForm from "../../components/user/RequestForm/RequestForm";
import RequestList from "../../components/user/RequestList/RequestList";

const MyRequests = () => {
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => setShowForm(!showForm);

	return (
		<div>
			<h1>My Requests</h1>
			<br />
			<Button variant="outlined" startIcon={<Add />} onClick={toggleForm}>
				New
			</Button>
			{showForm && <RequestForm showForm={showForm} toggleForm={toggleForm} />}
			<br />
			<br />
			<RequestList />
		</div>
	);
};

export default MyRequests;
