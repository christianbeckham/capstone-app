import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import useSettings from "../../../hooks/useSettings";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
	width: 56,
	height: 34,
	padding: 4,
	"& .MuiSwitch-switchBase": {
		margin: "7px 2px",
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			transform: "translateX(26px)",
			"& .MuiSwitch-thumb:before": {
				boxShadow:
					"inset -3px -2px 5px -2px #8983f7,inset -7px -5px 0 0 #a3dafb",
				background: "transparent",
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
				borderRadius: 26 / 2,
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#ff8c00",
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			borderRadius: 50,
			background: "linear-gradient(50deg,#ff0080,#ff8c00 70%)",
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
		borderRadius: 26 / 2,
	},
}));

const ThemeToggle = () => {
	const { mode, toggleMode } = useSettings();
	const handleModeChange = (e) => {
		const theme = e.target.checked ? "dark" : "light";
		toggleMode(theme);
	};
	return <ThemeSwitch checked={mode === "dark"} onChange={handleModeChange} />;
};

export default ThemeToggle;
