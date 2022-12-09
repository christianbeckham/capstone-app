import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";

const App = () => {
	return (
		<AuthProvider>
			<SettingsProvider>
				<Outlet />
			</SettingsProvider>
		</AuthProvider>
	);
};

export default App;
