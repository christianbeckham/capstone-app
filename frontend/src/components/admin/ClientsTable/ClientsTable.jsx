import React, { useState } from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

const ClientsTable = ({ clients }) => {
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
			<TableContainer component={Paper} sx={{ px: 2, py: 1 }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="clients table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "text.secondary" }}>Id</TableCell>
							<TableCell sx={{ color: "text.secondary" }} align="left">
								Full Name
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }} align="left">
								Email
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }} align="left">
								Date Joined
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }} align="left">
								Status
							</TableCell>
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{clients
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="left">{row.full_name}</TableCell>
									<TableCell align="left">{row.email}</TableCell>
									<TableCell align="left">
										{new Date(row?.date_joined).toLocaleDateString()}
									</TableCell>
									<TableCell align="left">
										{row.is_active ? (
											<Chip label="Active" color="success" />
										) : (
											<Chip label="Inactive" color="warning" />
										)}
									</TableCell>
									<TableCell align="left" sx={{ display: "flex" }}>
										<Button size="small" component={Link} to={`${row.id}`}>
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 15, 25]}
				component="div"
				count={clients.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default ClientsTable;
