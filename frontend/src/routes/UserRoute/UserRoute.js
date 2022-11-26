import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const UserRoute = () => {
	const [user] = useAuth();
	return user?.is_client ? (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	) : (
		<Navigate to="/login" replace />
	);
};

export default UserRoute;
