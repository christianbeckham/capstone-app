import React, { useState } from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";

import CheckInListItem from "../CheckInListItem/CheckInListItem";

const CheckInList = ({ checkIns }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div>
			<TableContainer>
				<Table aria-label="check-ins table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Weekly Review</TableCell>
							<TableCell align="center">Images</TableCell>
							<TableCell align="center">Trainer Feedback</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{checkIns.length > 0 ? (
							checkIns
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((checkin) => (
									<CheckInListItem key={checkin.id} checkin={checkin} />
								))
						) : (
							<TableRow
								sx={{ "& td": { bgcolor: "background.paper", border: 0 } }}
							>
								<TableCell>No check-in data</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{checkIns.length > 0 && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 15]}
					component="div"
					count={checkIns.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</div>
	);
};

export default CheckInList;
