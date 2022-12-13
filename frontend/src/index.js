import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { SettingsProvider } from "./context/SettingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<SettingsProvider>
			<RouterProvider router={router} />
		</SettingsProvider>
	</React.StrictMode>
);
