import React from "react";

import useAuth from "../../hooks/useAuth";
import TrainingPlan from "../../components/TrainingPlan/TrainingPlan";

const MyOverview = () => {
	const [user, token] = useAuth();

	return (
		<>
			<h1>Welcome, {user && user.first_name}!</h1>
			<TrainingPlan />
		</>
	);
};

export default MyOverview;
