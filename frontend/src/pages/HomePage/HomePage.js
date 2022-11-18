import React from "react";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
	const [user, token] = useAuth();

	return (
		<div className="container">
			<h1>Home Page for {user.username}!</h1>
		</div>
	);
};

export default HomePage;
