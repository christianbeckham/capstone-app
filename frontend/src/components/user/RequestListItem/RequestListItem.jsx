import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const RequestListItem = ({request}) => {
	return (
		<TableRow
			key={request.id}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell>
				{new Date(request.created_date).toLocaleDateString()}
			</TableCell>
			<TableCell align="left">{request.type}</TableCell>
			<TableCell align="left">{request.description}</TableCell>
			<TableCell align="left">{request.status_text}</TableCell>
		</TableRow>
	);
};

export default RequestListItem;
