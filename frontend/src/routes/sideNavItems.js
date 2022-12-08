import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import People from "@mui/icons-material/People";
import Grading from "@mui/icons-material/Grading";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import Dashboard from "@mui/icons-material/Dashboard";
import FitnessCenter from "@mui/icons-material/FitnessCenter";

export const adminNavItems = [
	{
		icon: AdminPanelSettings,
		key: "Dashboard",
		path: "/admin",
	},
	{
		icon: People,
		key: "Clients",
		path: "clients",
	},
	{
		icon: Grading,
		key: "Check-Ins",
		path: "checkins",
	},
	{
		icon: QuestionAnswer,
		key: "Requests",
		path: "requests",
	},
];

export const userNavItems = [
	{
		icon: Dashboard,
		key: "Dashboard",
		path: "/dashboard",
	},
	{
		icon: Grading,
		key: "Check-Ins",
		path: "/checkins",
	},
	{
		icon: FitnessCenter,
		key: "Workouts",
		path: "/workouts",
	},
	{
		icon: QuestionAnswer,
		key: "Requests",
		path: "/requests",
	},
];
