import { alpha } from "@mui/material/styles";

const GREY = {
	0: "#FFFFFF",
	100: "#F9FAFB",
	200: "#F4F6F8",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#919EAB",
	600: "#637381",
	700: "#454F5B",
	800: "#212B36",
	900: "#161C24",
};

const PRIMARY = {
	lighter: "#D1E9FC",
	light: "#76B0F1",
	main: "#2962FF",
	dark: "#103996",
	darker: "#061B64",
	contrastText: "#fff",
};

const SECONDARY = {
	lighter: "#D6E4FF",
	light: "#84A9FF",
	main: "#3366FF",
	dark: "#1939B7",
	darker: "#091A7A",
	contrastText: "#fff",
};

const INFO = {
	lighter: "#D0F2FF",
	light: "#74CAFF",
	main: "#1890FF",
	dark: "#0C53B7",
	darker: "#04297A",
	contrastText: "#fff",
};

const SUCCESS = {
	lighter: "#E9FCD4",
	light: "#AAF27F",
	main: "#54D62C",
	dark: "#229A16",
	darker: "#08660D",
	contrastText: GREY[800],
};

const WARNING = {
	lighter: "#FFF7CD",
	light: "#FFE16A",
	main: "#FFC107",
	dark: "#B78103",
	darker: "#7A4F01",
	contrastText: GREY[800],
};

const ERROR = {
	lighter: "#FFE7D9",
	light: "#FFA48D",
	main: "#FF4842",
	dark: "#B72136",
	darker: "#7A0C2E",
	contrastText: "#fff",
};

const palette = {
	common: { black: "#000", white: "#fff" },
	primary: PRIMARY,
	secondary: SECONDARY,
	info: INFO,
	success: SUCCESS,
	warning: WARNING,
	error: ERROR,
	grey: GREY,
	divider: alpha(GREY[500], 0.24),
	action: {
		active: GREY[600],
		hover: alpha(GREY[500], 0.08),
		disabled: alpha(GREY[500], 0.8),
		disabledBackground: alpha(GREY[500], 0.24),
		focus: alpha(GREY[500], 0.24),
		hoverOpacity: 0.08,
		selectedOpacity: 0,
		disabledOpacity: 0.48,
	},
};

export const light = {
	...palette,
	contrastThreshold: 3,
	mode: "light",
	background: {
		paper: "#FFF",
		default: palette.grey[100],
		neutral: palette.grey[200],
	},
	text: {
		primary: palette.grey[800],
		secondary: palette.grey[600],
		disabled: palette.grey[500],
	},
	action: {
		...palette.action,
		selected: alpha(palette.grey[100], 0.16),
	},
};

export const dark = {
	...palette,
	contrastThreshold: 4.5,
	mode: "dark",
	background: {
		paper: palette.grey[900],
		default: palette.grey[800],
		neutral: palette.grey[700],
	},
	text: {
		primary: palette.grey[100],
		secondary: palette.grey[300],
		disabled: palette.grey[600],
	},
	action: {
		...palette.action,
		selected: alpha(palette.grey[800], 0.16),
	},
};
