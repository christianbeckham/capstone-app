import React from "react";
import { Skeleton } from "@mui/material";

const TableSkeleton = () => {
	return (
		<>
			<Skeleton
				sx={{ bgcolor: "background.neutral", borderRadius: 1, mb: 1 }}
				variant="rectangular"
				width={"100%"}
				height={40}
			/>
			<Skeleton
				sx={{ bgcolor: "background.neutral", borderRadius: 1 }}
				variant="rectangular"
				width={"100%"}
				height={300}
			/>
			<Skeleton
				sx={{ bgcolor: "background.neutral", borderRadius: 1, mt: 1, float: "right" }}
				variant="rectangular"
				width={"25%"}
				height={40}
			/>
		</>
	);
};

export default TableSkeleton;
