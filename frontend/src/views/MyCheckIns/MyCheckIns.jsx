import React from "react";

import CheckInForm from "../../components/CheckInForm/CheckInForm";
import CheckInList from "../../components/CheckInList/CheckInList";

const MyCheckIns = () => {
	return (
		<div>
			<h1>My Check-Ins</h1>
			<br />
			<CheckInForm />
			<br />
			<br />
			<CheckInList />
		</div>
	);
};

export default MyCheckIns;
