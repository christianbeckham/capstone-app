import React, { useState } from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";

import RequestListItem from "../RequestListItem/RequestListItem";
import NoDataOverlay from "../../app/NoDataOverlay/NoDataOverlay";

const RequestList = ({ requests }) => {
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
		<>
			{requests.length > 0 ? (
				<>
					<TableContainer>
						<Table aria-label="requests table">
							{requests.length > 0 && (
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Request Type</TableCell>
										<TableCell>Description</TableCell>
										<TableCell align="center">Status</TableCell>
									</TableRow>
								</TableHead>
							)}
							<TableBody>
								{requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
									<RequestListItem key={request.id} request={request} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 15]}
						component="div"
						count={requests.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			) : (
				<NoDataOverlay message={"No requests available"} />
			)}
		</>
	);
};

export default RequestList;
