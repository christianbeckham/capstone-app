import React, { useState } from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";

const ClientsTable = ({ clients }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(15);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		setPage(0);
	};

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

	return (
		<>
			<TableContainer>
				<Table aria-label="clients table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Date Joined</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.full_name}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{new Date(row?.date_joined).toLocaleDateString()}</TableCell>
								<TableCell align="center">
									{row.is_active ? <Chip label="Active" color="success" /> : <Chip label="Inactive" color="warning" />}
								</TableCell>
								<TableCell align="center">
									<IconButton component={Link} to={`${row.id}`} aria-label="view client user" color="primary">
										<ExitToApp />
									</IconButton>
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
								<TableCell colSpan={12} />
							</TableRow>
						)}
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
