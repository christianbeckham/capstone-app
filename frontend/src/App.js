import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/NavBar/NavBar";
import "./App.css";

const App = () => {
	return (
		<AuthProvider>
			<Navbar />
			<Outlet />
		</AuthProvider>
	);
};

export default App;
