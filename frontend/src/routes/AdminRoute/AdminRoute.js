import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import AdminLayout from "../../layouts/AdminLayout/AdminLayout";

const AdminRoute = () => {
	const [user] = useAuth();
	return user?.is_admin ? (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	) : (
		<Navigate to="/login" replace />
	);
};

export default AdminRoute;
