import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/app/ErrorPage/ErrorPage";
import HomePage from "../pages/app/HomePage/HomePage";
import LoginPage from "../pages/app/LoginPage/LoginPage";
import RegisterPage from "../pages/app/RegisterPage/RegisterPage";
import ProfilePage from "../pages/app/ProfilePage/ProfilePage";
import SettingsPage from "../pages/app/SettingsPage/SettingsPage";
import UserCheckInPage from "../pages/UserCheckInPage/UserCheckInPage";
import AdminUserPage from "../pages/AdminUserPage/AdminUserPage";
import AdminUserCheckInPage from "../pages/AdminUserCheckInPage/AdminUserCheckInPage";

import MyOverview from "../views/MyOverview/MyOverview";
import MyCheckIns from "../views/MyCheckIns/MyCheckIns";
import MyWorkouts from "../views/MyWorkouts/MyWorkouts";
import MyRequests from "../views/MyRequests/MyRequests";
import AdminDashboard from "../views/AdminDashboard/AdminDashboard";
import AdminClients from "../views/AdminClients/AdminClients";
import AdminCheckIns from "../views/AdminCheckIns/AdminCheckIns";
import AdminRequests from "../views/AdminRequests/AdminRequests";

import PublicRoute from "./PublicRoute/PublicRoute";
import UserRoute from "./UserRoute/UserRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />} errorElement={<ErrorPage />}>
			<Route exact path="/" element={<PublicRoute />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>

			<Route path="/" element={<UserRoute />}>
				<Route path="dashboard" element={<MyOverview />} />
				<Route path="checkins" element={<MyCheckIns />} />
				<Route path="checkins/:checkinId" element={<UserCheckInPage />} />
				<Route path="workouts" element={<MyWorkouts />} />
				<Route path="requests" element={<MyRequests />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>

			<Route path="/admin" element={<AdminRoute />}>
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="clients" element={<AdminClients />} />
				<Route path="clients/:clientId" element={<AdminUserPage />} />
				<Route path="checkins" element={<AdminCheckIns />} />
				<Route path="checkins/:checkinId" element={<AdminUserCheckInPage />} />
				<Route path="requests" element={<AdminRequests />} />
			</Route>
		</Route>
	)
);

export { router };
