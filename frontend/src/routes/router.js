import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// App-Public route & pages
import App from "../App";
import ErrorPage from "../pages/app/ErrorPage/ErrorPage";
import PublicRoute from "./PublicRoute/PublicRoute";
import HomePage from "../pages/app/HomePage/HomePage";
import LoginPage from "../pages/app/LoginPage/LoginPage";
import RegisterPage from "../pages/app/RegisterPage/RegisterPage";

// Admin route & pages
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminDashboardPage from "../pages/admin/DashboardPage/DashboardPage";
import ClientsPage from "../pages/admin/ClientsPage/ClientsPage";
import UserProfilePage from "../pages/admin/UserProfilePage/UserProfilePage";
import AdminCheckInsPage from "../pages/admin/CheckInsPage/CheckInsPage";
import UserCheckInPage from "../pages/admin/UserCheckInPage/UserCheckInPage";
import AdminRequestsPage from "../pages/admin/RequestsPage/RequestsPage";

// User route & pages
import UserRoute from "./UserRoute/UserRoute";
import UserDashboardPage from "../pages/user/DashboardPage/DashboardPage";
import UserCheckInsPage from "../pages/user/CheckInsPage/CheckInsPage";
import CheckInDetailsPage from "../pages/user/CheckInDetailsPage/CheckInDetailsPage";
import WorkoutsPage from "../pages/user/WorkoutsPage/WorkoutsPage";
import UserRequestsPage from "../pages/user/RequestsPage/RequestsPage";
import ProfilePage from "../pages/app/ProfilePage/ProfilePage";
import SettingsPage from "../pages/app/SettingsPage/SettingsPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />} errorElement={<ErrorPage />}>
			<Route exact path="/" element={<PublicRoute />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>

			<Route path="/u" element={<UserRoute />}>
				<Route index element={<UserDashboardPage />} />
				<Route path="checkins" element={<UserCheckInsPage />} />
				<Route path="checkins/:checkinId" element={<CheckInDetailsPage />} />
				<Route path="workouts" element={<WorkoutsPage />} />
				<Route path="requests" element={<UserRequestsPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>

			<Route path="/a" element={<AdminRoute />}>
				<Route index element={<AdminDashboardPage />} />
				<Route path="clients" element={<ClientsPage />} />
				<Route path="clients/:clientId" element={<UserProfilePage />} />
				<Route path="checkins" element={<AdminCheckInsPage />} />
				<Route path="checkins/:checkinId" element={<UserCheckInPage />} />
				<Route path="requests" element={<AdminRequestsPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Route>
	)
);

export { router };
