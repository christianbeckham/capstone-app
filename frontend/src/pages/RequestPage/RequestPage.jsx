import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const RequestPage = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default RequestPage;
