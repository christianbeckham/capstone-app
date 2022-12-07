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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import useAuth from "../../../hooks/useAuth";

const CheckInTable = ({ checkins, fetchCheckIns }) => {
	const [user, token] = useAuth();
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
			const response = await axios.delete(
				`http://127.0.0.1:8000/api/checkins/all/${checkInId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 204) {
				fetchCheckIns();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<TableContainer component={Paper} sx={{ px: 2, py: 1 }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "text.secondary" }}>Date</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>By</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>Weight</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>
								Client Review
							</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>Images</TableCell>
							<TableCell sx={{ color: "text.secondary" }}>Feedback</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{checkins.length > 0 ? (
							checkins
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((check) => (
									<TableRow
										key={check.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell align="left">
											{new Date(check?.created_date).toLocaleDateString()}
										</TableCell>
										<TableCell align="left">{check.user.full_name}</TableCell>
										<TableCell align="left">{check.weight}</TableCell>
										<TableCell align="left">
											{check.weekly_review ? check.weekly_review : "n/a"}
										</TableCell>
										<TableCell align="left">{check.images.length}</TableCell>
										<TableCell align="left">
											{check.trainer_feedback ? check.trainer_feedback : "n/a"}
										</TableCell>
										<TableCell align="left" sx={{ display: "flex" }}>
											<Button size="small" component={Link} to={`${check.id}`}>
												View
											</Button>
											<Button
												size="small"
												color="error"
												onClick={() => deleteCheckIn(check.id)}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))
						) : (
							<TableRow scope="row">
								<TableCell>No entries...</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 15, 25]}
				component="div"
				count={checkins.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default CheckInTable;
