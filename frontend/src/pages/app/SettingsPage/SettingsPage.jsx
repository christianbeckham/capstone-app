import React from "react";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import PageToolbar from "../../../components/app/PageToolbar/PageToolbar";
import useSettings from "../../../hooks/useSettings";

const SettingsPage = () => {
	const { mode, toggleMode, collapsed, toggleMenu } = useSettings();

	const handleModeChange = (e, mode) => toggleMode(mode);
	const handleMenuChange = (e) => {
		if (e.target.value && typeof e.target.value === "string") {
			if (e.target.value.toLowerCase() === "true") toggleMenu(true);
			if (e.target.value.toLowerCase() === "false") toggleMenu(false);
		}
	};

	return (
		<div>
			<PageToolbar pageTitle={"Settings"} />
			<Card>
				<Stack spacing={2}>
					<FormControl>
						<FormLabel id="theme-radio-buttons-group">
							<Typography variant="h6">Appearance</Typography>
						</FormLabel>
						<RadioGroup
							aria-labelledby="theme-radio-buttons-group"
							name="theme-radio-buttons-group"
							value={mode}
							onChange={handleModeChange}
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<FormControlLabel
								value="light"
								control={<Radio />}
								label="Light"
							/>
							<FormControlLabel value="dark" control={<Radio />} label="Dark" />
						</RadioGroup>
					</FormControl>
					<FormControl>
						<FormLabel id="nav-radio-buttons-group">
							<Typography variant="h6">Navigation</Typography>
						</FormLabel>
						<RadioGroup
							aria-labelledby="nav-radio-buttons-group"
							name="nav-radio-buttons-group"
							value={String(collapsed)}
							onChange={handleMenuChange}
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<FormControlLabel
								value="false"
								control={<Radio />}
								label="Expanded"
							/>
							<FormControlLabel
								value="true"
								control={<Radio />}
								label="Collapsed"
							/>
						</RadioGroup>
					</FormControl>
				</Stack>
			</Card>
		</div>
	);
};

export default SettingsPage;
