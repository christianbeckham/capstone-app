import React, { useState } from "react";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

import CheckInForm from "../../components/CheckInForm/CheckInForm";
import CheckInList from "../../components/CheckInList/CheckInList";

const MyCheckIns = () => {
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => setShowForm(!showForm);

	return (
		<div>
			<h1>My Check-Ins</h1>
			<br />
			<Button variant="outlined" startIcon={<Add />} onClick={toggleForm}>
				New
			</Button>
			{showForm && <CheckInForm showForm={showForm} toggleForm={toggleForm} />}
			<br />
			<br />
			<CheckInList />
		</div>
	);
};

export default MyCheckIns;
