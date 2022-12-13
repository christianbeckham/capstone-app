import React from "react";

import Chip from "@mui/material/Chip";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const RequestListItem = ({ request }) => {
	return (
		<TableRow key={request.id}>
			<TableCell>
				{new Date(request.created_date).toLocaleDateString()}
			</TableCell>
			<TableCell>{request.type}</TableCell>
			<TableCell>{request.description}</TableCell>
			<TableCell align="center">
				{request.status_text === "open" ? (
					<Chip label={request.status_text.toUpperCase()} color="success" />
				) : (
					<Chip label={request.status_text.toUpperCase()} color="error" />
				)}
			</TableCell>
		</TableRow>
	);
};

export default RequestListItem;
