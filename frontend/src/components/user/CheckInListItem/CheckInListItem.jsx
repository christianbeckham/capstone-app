import React from "react";
import { Link } from "react-router-dom";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

const CheckInListItem = ({ checkin }) => {
	return (
		<TableRow key={checkin.id}>
			<TableCell>
				{new Date(checkin.created_date).toLocaleDateString()}
			</TableCell>
			<TableCell>{checkin.weight}</TableCell>
			<TableCell>{checkin.weekly_review}</TableCell>
			<TableCell align="center">{checkin.images.length}</TableCell>
			<TableCell align="center">
				{checkin.trainer_feedback ? (
					<CheckCircleOutline color="success" />
				) : (
					<RemoveCircleOutline color="warning" />
				)}
			</TableCell>
			<TableCell align="center">
				<IconButton
					component={Link}
					to={`${checkin.id}`}
					aria-label="view check-in"
					color="primary"
				>
					<ExitToApp />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default CheckInListItem;
