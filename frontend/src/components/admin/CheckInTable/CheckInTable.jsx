import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Delete from "@mui/icons-material/Delete";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import useAuth from "../../../hooks/useAuth";

const CheckInTable = ({ checkins, fetchCheckIns }) => {
	const { token } = useAuth();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const deleteCheckIn = async (checkInId) => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/all/${checkInId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 204) {
				fetchCheckIns();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - checkins.length) : 0;

	return (
		<>
			{checkins.length > 0 ? (
				<>
					<TableContainer>
						<Table aria-label="check-ins table">
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell>By</TableCell>
									<TableCell>Weight</TableCell>
									<TableCell>Client Review</TableCell>
									<TableCell align="center">Images</TableCell>
									<TableCell align="center">Feedback</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{checkins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((check) => (
									<TableRow key={check.id}>
										<TableCell>{new Date(check?.created_date).toLocaleDateString()}</TableCell>
										<TableCell>{check.user.full_name}</TableCell>
										<TableCell>{check.weight} lbs</TableCell>
										<TableCell
											sx={{ maxWidth: "300px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
										>
											{check.weekly_review ? check.weekly_review : "n/a"}
										</TableCell>
										<TableCell align="center">{check.images.length}</TableCell>
										<TableCell align="center">
											{check.trainer_feedback ? (
												<CheckCircleOutline color="success" />
											) : (
												<RemoveCircleOutline color="warning" />
											)}
										</TableCell>
										<TableCell align="center">
											<IconButton component={Link} to={`${check.id}`} aria-label="view check-in" color="primary">
												<ExitToApp />
											</IconButton>
											<IconButton color="error" onClick={() => deleteCheckIn(check.id)}>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
								{emptyRows > 0 && (
									<TableRow sx={{ height: 55 * emptyRows, "& td": { backgroundColor: "transparent" } }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 15]}
						component="div"
						count={checkins.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			) : (
				<div>
					<p>No entries...</p>
				</div>
			)}
		</>
	);
};

export default CheckInTable;
