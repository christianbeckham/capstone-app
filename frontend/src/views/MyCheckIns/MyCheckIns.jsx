import React from "react";

import CheckInForm from "../../components/user/CheckInForm/CheckInForm";
import CheckInList from "../../components/user/CheckInList/CheckInList";

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
