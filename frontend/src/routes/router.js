import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import CheckInPage from "../pages/CheckInPage/CheckInPage";
import MyOverview from "../views/MyOverview/MyOverview";
import MyCheckIns from "../views/MyCheckIns/MyCheckIns";
import CheckInForm from "../components/CheckInForm/CheckInForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "dashboard",
				element: <DashboardPage />,
				children: [
					{
						path: "",
						element: <MyOverview />,
					},
					{
						path: "checkins",
						element: <CheckInPage />,
						children: [
							{
								path: "",
								element: <MyCheckIns />,
							},
							{ path: "new", element: <CheckInForm /> },
						],
					},
					{
						path: "workouts",
						element: <></>,
					},
					{
						path: "requests",
						element: <></>,
					},
				],
			},
		],
	},
]);

export { router };
