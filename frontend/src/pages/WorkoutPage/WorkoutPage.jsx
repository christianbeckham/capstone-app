import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const WorkoutPage = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
};

export default WorkoutPage;
