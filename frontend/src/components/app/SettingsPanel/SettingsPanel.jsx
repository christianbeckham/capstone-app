import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Close from "@mui/icons-material/Close";

import useSettings from "../../../hooks/useSettings";

const SettingsPanel = ({ open, toggleSettingsPanel }) => {
	const { mode, toggleMode, collapsed, toggleMenu } = useSettings();

	const handleModeChange = (e, mode) => toggleMode(mode);
	const handleMenuChange = (e) => {
		if (e.target.value && typeof e.target.value === "string") {
			if (e.target.value.toLowerCase() === "true") toggleMenu(true);
			if (e.target.value.toLowerCase() === "false") toggleMenu(false);
		}
	};

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={toggleSettingsPanel}
			sx={{
				"& .MuiDrawer-paper": {
					width: 280,
				},
			}}
			variant="temporary"
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
				}}
			>
				<Typography variant="h5">My Settings</Typography>
				<IconButton color="inherit" onClick={toggleSettingsPanel} edge="end">
					<Close />
				</IconButton>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", px: 2 }}>
				<FormControl>
					<FormLabel id="theme-radio-buttons-group">
						<Typography marginTop={3} variant="h6">
							Appearance
						</Typography>
					</FormLabel>
					<RadioGroup
						aria-labelledby="theme-radio-buttons-group"
						name="theme-radio-buttons-group"
						value={mode}
						onChange={handleModeChange}
					>
						<FormControlLabel value="light" control={<Radio />} label="Light" />
						<FormControlLabel value="dark" control={<Radio />} label="Dark" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="theme-radio-buttons-group">
						<Typography marginTop={3} variant="h6">
							Navigation
						</Typography>
					</FormLabel>
					<RadioGroup
						aria-labelledby="theme-radio-buttons-group"
						name="theme-radio-buttons-group"
						value={String(collapsed)}
						onChange={handleMenuChange}
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
			</Box>
		</Drawer>
	);
};

export default SettingsPanel;
