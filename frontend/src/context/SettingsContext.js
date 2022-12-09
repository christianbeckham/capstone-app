import React, { createContext, useMemo } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { createAppTheme } from "../theme/index";
import GlobalAppStyles from "../theme/globalStyles";

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
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<GlobalAppStyles />
					{children}
				</ThemeProvider>
			</StyledEngineProvider>
		</SettingsContext.Provider>
	);
};
