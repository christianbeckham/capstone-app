import React from "react";

import { Box } from "@mui/material";

const TabPanel = (props) => {
	const { children, value, active, index } = props;
	return (
		<div role="tabpanel" hidden={value !== active} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
			{value === active && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
