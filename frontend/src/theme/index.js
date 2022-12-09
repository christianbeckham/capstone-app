import { createTheme } from "@mui/material/styles";
import { appComponents } from "./components";
import { light, dark } from "./palette";
import typography from "./typography";

export const createAppTheme = (mode) => {
	const palette = mode === "dark" ? dark : light;
	const theme = createTheme({ palette, typography });
	return createTheme({ components: appComponents(theme) }, theme);
};
