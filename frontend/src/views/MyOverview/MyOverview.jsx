import React from "react";
import useAuth from "../../hooks/useAuth";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import TrainingPlan from "../../components/TrainingPlan/TrainingPlan";

const MyOverview = () => {
	const [user, token] = useAuth();

	return (
		<DashboardLayout>
			<h1>Welcome, {user.first_name}!</h1>
			<TrainingPlan token={token} />
		</DashboardLayout>
	);
};

export default MyOverview;
