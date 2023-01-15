import React, { useState } from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import RequestForm from "../RequestForm/RequestForm";

const RequestTable = ({ requests, fetchRequests }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(15);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

	return (
		<>
			{requests.length > 0 ? (
				<>
					<TableContainer>
						<Table aria-label="requests table">
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell>Request Type</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>By</TableCell>
									<TableCell align="center">Status</TableCell>
									<TableCell align="center">Responded</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
									<TableRow key={request.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell align="left">{new Date(request?.created_date).toLocaleDateString()}</TableCell>
										<TableCell align="left" sx={{ textTransform: "capitalize" }}>
											{request.type}
										</TableCell>
										<TableCell
											align="left"
											sx={{ maxWidth: "300px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
										>
											{request.description}
										</TableCell>
										<TableCell align="left">{request.user.full_name}</TableCell>
										<TableCell align="center">
											{request.status_text === "open" ? (
												<Chip label={request.status_text.toUpperCase()} color="success" />
											) : (
												<Chip label={request.status_text.toUpperCase()} color="error" />
											)}
										</TableCell>
										<TableCell align="center">
											{request.response ? (
												<CheckCircleOutline color="success" />
											) : (
												<RemoveCircleOutline color="warning" />
											)}
										</TableCell>
										<TableCell align="center">
											<RequestForm requestInfo={request} fetchRequests={fetchRequests} />
										</TableCell>
									</TableRow>
								))}
								{emptyRows > 0 && (
									<TableRow
										sx={{
											height: 41 * emptyRows,
											bgcolor: "transparent",
											"& td": { backgroundColor: "transparent" },
											"&.MuiTableRow-hover": {
												"&:hover": {
													backgroundColor: "transparent",
												},
											},
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 15, 25]}
						component="div"
						count={requests.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			) : (
				<div>
					<p>No requests</p>
				</div>
			)}
		</>
	);
};

export default RequestTable;
