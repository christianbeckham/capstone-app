import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CheckInPage from "../pages/CheckInPage/CheckInPage";
import WorkoutPage from "../pages/WorkoutPage/WorkoutPage";
import RequestPage from "../pages/RequestPage/RequestPage";
import ProfilePage from "../pages/user/ProfilePage/ProfilePage";
import SettingsPage from "../pages/user/SettingsPage/SettingsPage";
import ExercisePage from "../pages/ExercisePage/ExercisePage";
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
			<Route exact path="/" element={<HomePage />} />

			<Route path="/" element={<PublicRoute />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>

			<Route path="/" element={<UserRoute />}>
				<Route path="dashboard" element={<MyOverview />} />
				<Route path="checkins" element={<CheckInPage />}>
					<Route path="" element={<MyCheckIns />} />
					<Route path=":checkinId" element={<UserCheckInPage />} />
				</Route>
				<Route path="workouts" element={<WorkoutPage />}>
					<Route path="" element={<MyWorkouts />} />
				</Route>
				<Route path="exercise/:exerciseId" element={<ExercisePage />} />
				<Route path="requests" element={<RequestPage />}>
					<Route path="" element={<MyRequests />} />
				</Route>
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
