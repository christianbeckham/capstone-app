import React, { useState } from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";

import CheckInListItem from "../CheckInListItem/CheckInListItem";
import NoDataOverlay from "../../app/NoDataOverlay/NoDataOverlay";

const CheckInList = ({ checkIns }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			{checkIns.length > 0 ? (
				<>
					<TableContainer>
						<Table aria-label="check-ins table">
							{checkIns.length > 0 && (
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
							)}
							<TableBody data-test="checkin-table-body">
								{checkIns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((checkin) => (
									<CheckInListItem key={checkin.id} checkin={checkin} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 15, 25]}
						component="div"
						count={checkIns.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			) : (
				<NoDataOverlay message="No check-ins available" />
			)}
		</>
	);
};

export default CheckInList;
