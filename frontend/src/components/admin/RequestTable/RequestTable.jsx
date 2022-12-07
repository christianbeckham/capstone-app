import React, { useState } from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import RequestForm from "../RequestForm/RequestForm";

const RequestTable = ({ requests, fetchRequests }) => {
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
		<div>
			<TableContainer component={Paper} sx={{ px: 2, py: 1 }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "text.secondary" }}>Date</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>
								Request Type
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>
								Description
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>By</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>Response</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.length > 0 ? (
							requests
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((request) => (
									<TableRow
										key={request.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell align="left">
											{new Date(request?.created_date).toLocaleDateString()}
										</TableCell>
										<TableCell align="left">{request.type}</TableCell>
										<TableCell align="left">{request.description}</TableCell>
										<TableCell align="left">{request.user.full_name}</TableCell>
										<TableCell align="left">
											{request.status_text === "open" ? (
												<Chip
													label={request.status_text.toUpperCase()}
													color="success"
												/>
											) : (
												<Chip
													label={request.status_text.toUpperCase()}
													color="error"
												/>
											)}
										</TableCell>
										<TableCell align="left">
											{request.response ? (
												<CheckCircleOutline color="success" />
											) : (
												<RemoveCircleOutline color="warning" />
											)}
										</TableCell>
										<TableCell align="left" sx={{ display: "flex" }}>
											<RequestForm
												requestInfo={request}
												fetchRequests={fetchRequests}
											/>
										</TableCell>
									</TableRow>
								))
						) : (
							<TableRow scope="row">
								<TableCell>No requests</TableCell>
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
		</div>
	);
};

export default RequestTable;
