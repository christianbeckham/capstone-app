import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserLayout from "../../layouts/UserLayout/UserLayout";

const UserRoute = () => {
	const { user } = useAuth();
	return user?.is_client ? (
		<UserLayout>
			<Outlet />
		</UserLayout>
	) : (
		<Navigate to="/login" replace />
	);
};

export default UserRoute;
