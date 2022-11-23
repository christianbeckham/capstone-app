import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const RequestPage = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
};

export default RequestPage;
