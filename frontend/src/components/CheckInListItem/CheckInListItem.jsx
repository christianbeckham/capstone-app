import React from "react";
import { Link } from "react-router-dom";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";

const CheckInListItem = ({ checkin }) => {
	return (
		<TableRow
			key={checkin.id}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell>
				{new Date(checkin.created_date).toLocaleDateString()}
			</TableCell>
			<TableCell align="left">{checkin.weight}</TableCell>
			<TableCell align="left">{checkin.weekly_review}</TableCell>
			<TableCell align="left">{checkin.images.length}</TableCell>
			<TableCell align="left">{checkin.trainer_feedback}</TableCell>
			<TableCell>
				<IconButton
					component={Link}
					to={`${checkin.id}`}
					aria-label="fingerprint"
					color="primary"
				>
					<ExitToApp />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default CheckInListItem;
