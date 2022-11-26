import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
	const [user] = useAuth();
	return user?.is_admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
