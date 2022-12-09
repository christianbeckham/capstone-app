import React, { createContext, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { createAppTheme } from "../theme/theme";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
	const [mode, setMode] = useLocalStorage("mode", "light");
	const [collapsed, setCollapsed] = useLocalStorage("sidebarcollapsed", false);

	const theme = useMemo(() => createAppTheme(mode), [mode]);

	const colorMode = useMemo(
		() => ({
			toggleMode: (mode) => {
				if (mode) setMode(mode);
			},
		}),
		[]
	);

	const navMode = useMemo(
		() => ({
			toggleMenu: (collapsed) => {
				if (typeof collapsed === "boolean") setCollapsed(collapsed);
			},
		}),
		[]
	);

	return (
		<SettingsContext.Provider
			value={{
				mode,
				toggleMode: colorMode.toggleMode,
				collapsed,
				toggleMenu: navMode.toggleMenu,
			}}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</SettingsContext.Provider>
	);
};
