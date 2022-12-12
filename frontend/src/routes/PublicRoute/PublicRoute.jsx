import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
	const { user, urlPrefix } = useAuth();

	if (user?.is_client) {
		return <Navigate to={`/${urlPrefix}`} replace />;
	} else if (user?.is_admin) {
		return <Navigate to={`/${urlPrefix}`} replace />;
	}

	return (
		<>
			<Outlet />
		</>
	);
};

export default PublicRoute;
