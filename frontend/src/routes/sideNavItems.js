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
		path: "/a",
	},
	{
		icon: People,
		key: "Clients",
		path: "/a/clients",
	},
	{
		icon: Grading,
		key: "Check-Ins",
		path: "/a/checkins",
	},
	{
		icon: QuestionAnswer,
		key: "Requests",
		path: "/a/requests",
	},
];

export const userNavItems = [
	{
		icon: Dashboard,
		key: "Dashboard",
		path: "/u",
	},
	{
		icon: Grading,
		key: "Check-Ins",
		path: "/u/checkins",
	},
	{
		icon: FitnessCenter,
		key: "Workouts",
		path: "/u/workouts",
	},
	{
		icon: QuestionAnswer,
		key: "Requests",
		path: "/u/requests",
	},
];
