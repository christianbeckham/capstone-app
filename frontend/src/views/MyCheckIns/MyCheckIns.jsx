import React from "react";

import PageToolbar from "../../components/app/PageToolbar/PageToolbar";
import CheckInForm from "../../components/user/CheckInForm/CheckInForm";
import CheckInList from "../../components/user/CheckInList/CheckInList";

const MyCheckIns = () => {
	return (
		<div>
			<PageToolbar pageTitle="My Check-Ins" />
			<CheckInForm />
			<br />
			<br />
			<CheckInList />
		</div>
	);
};

export default MyCheckIns;
