import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const WorkoutPage = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default WorkoutPage;
