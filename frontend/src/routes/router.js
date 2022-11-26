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
import ExercisePage from "../pages/ExercisePage/ExercisePage";
import CheckInItemPage from "../pages/CheckInItemPage/CheckInItemPage";

import MyOverview from "../views/MyOverview/MyOverview";
import MyCheckIns from "../views/MyCheckIns/MyCheckIns";
import MyWorkouts from "../views/MyWorkouts/MyWorkouts";
import MyRequests from "../views/MyRequests/MyRequests";

import PublicRoute from "./PublicRoute/PublicRoute";
import UserRoute from "./UserRoute/UserRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminPage from "../pages/AdminPage/AdminPage";

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
					<Route path=":checkinId" element={<CheckInItemPage />} />
				</Route>
				<Route path="workouts" element={<WorkoutPage />}>
					<Route path="" element={<MyWorkouts />} />
				</Route>
				<Route path="exercise/:exerciseId" element={<ExercisePage />} />
				<Route path="requests" element={<RequestPage />}>
					<Route path="" element={<MyRequests />} />
				</Route>
			</Route>

			<Route path="/" element={<AdminRoute />}>
				<Route path="admin" element={<AdminPage />} />
				{/* <Route path="clients" element={<ClientsPage />} /> */}
				{/* <Route path="requests" element={<AdminRequestPage />} /> */}
			</Route>
		</Route>
	)
);

export { router };
