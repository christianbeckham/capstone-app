import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import InfoRing from "../../app/InfoRing/InfoRing";

const MacrosCard = ({ plan }) => {
	return (
		<Card>
			<CardHeader title={"My Macros"} />
			<CardContent>
				<Box
					sx={{
						display: "grid",
						gap: 1,
						gridTemplateColumns: "repeat(4, 1fr)",
					}}
				>
					<InfoRing text={"calories"} value={plan?.calories.toLocaleString(undefined)} />
					<InfoRing text={"protein"} value={plan?.protein.toLocaleString(undefined)} />
					<InfoRing text={"carbs"} value={plan?.carbs.toLocaleString(undefined)} />
					<InfoRing text={"fats"} value={plan?.fats.toLocaleString(undefined)} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default MacrosCard;
