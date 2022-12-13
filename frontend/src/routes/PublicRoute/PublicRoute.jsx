import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
	const { user } = useAuth();

	if (user?.is_client) {
		return <Navigate to={"/u"} replace />;
	} else if (user?.is_admin) {
		return <Navigate to={"/a"} replace />;
	}

	return (
		<>
			<Outlet />
		</>
	);
};

export default PublicRoute;
