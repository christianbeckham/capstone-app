import React from "react";
import { Stack, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import ImagePreviewModal from "../../user/ImagePreviewModal/ImagePreviewModal";

const CheckInImageListActions = ({ image }) => {
	return (
		<Stack direction={"row"} spacing={1}>
			<ImagePreviewModal image={image} />
			<IconButton color="error">
				<Delete />
			</IconButton>
		</Stack>
	);
};

export default CheckInImageListActions;
