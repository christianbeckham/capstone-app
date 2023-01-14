import React from "react";

import { Box, Typography } from "@mui/material";
import { StyledOverlay } from "./NoDataOverlay.styled";

const NoDataOverlay = ({ message }) => {
	return (
		<StyledOverlay>
			<Box sx={{ my: 1 }}>
				<Typography sx={{ textTransform: "capitalize" }}>{message}</Typography>
			</Box>
		</StyledOverlay>
	);
};

export default NoDataOverlay;
