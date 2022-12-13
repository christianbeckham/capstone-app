import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const InfoRing = ({ value, text }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box sx={{ position: "relative", display: "flex" }}>
				<CircularProgress
					variant="determinate"
					size="5rem"
					thickness={3}
					value={100}
				/>
				<Box
					sx={{
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Stack alignItems={"center"}>
						{value && (
							<Typography
								variant="body1"
								component="div"
								color="text.secondary"
							>
								{value}
							</Typography>
						)}
						<Typography
							variant="caption"
							component="div"
							color="text.secondary"
						>
							{text}
						</Typography>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
};

export default InfoRing;
