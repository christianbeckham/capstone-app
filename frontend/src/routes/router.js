import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CheckInPage from "../pages/CheckInPage/CheckInPage";
import WorkoutPage from "../pages/WorkoutPage/WorkoutPage";
import RequestPage from "../pages/RequestPage/RequestPage";
import ExercisePage from "../pages/ExercisePage/ExercisePage";

import MyOverview from "../views/MyOverview/MyOverview";
import MyCheckIns from "../views/MyCheckIns/MyCheckIns";
import CheckInForm from "../components/CheckInForm/CheckInForm";
import MyWorkouts from "../views/MyWorkouts/MyWorkouts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
			{ path: "dashboard", element: <MyOverview /> },
			{
				path: "checkins",
				element: <CheckInPage />,
				children: [
					{ path: "", element: <MyCheckIns /> },
					{ path: "new", element: <CheckInForm /> },
				],
			},
			{
				path: "workouts",
				element: <WorkoutPage />,
				children: [{ path: "", element: <MyWorkouts /> }],
			},
			{ path: "exercise/:exerciseId", element: <ExercisePage /> },
			{ path: "requests", element: <RequestPage /> },
		],
	},
]);

export { router };
