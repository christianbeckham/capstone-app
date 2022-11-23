import React from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import CheckInListItem from "../CheckInListItem/CheckInListItem";

const CheckInList = ({ checkins }) => {
	return (
		<div>
			<p>Check-In List</p>
			<p>Check-In List Items...</p>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Feeback</TableCell>
							<TableCell>Images</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{checkins.length > 0 ? (
							checkins.map((checkin) => (
								<CheckInListItem key={checkin.id} checkin={checkin} />
							))
						) : (
							<TableRow scope="row">
								<TableCell>No entries...</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default CheckInList;
