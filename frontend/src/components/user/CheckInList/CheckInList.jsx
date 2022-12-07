import React, { useEffect, useState } from "react";
import axios from "axios";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import useAuth from "../../../hooks/useAuth";
import CheckInListItem from "../CheckInListItem/CheckInListItem";

const CheckInList = () => {
	const [user, token] = useAuth();
	const [checkins, setCheckins] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const fetchCheckIns = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/checkins/",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.status === 200) {
					const data = await response.data;
					setCheckins(data);
				}
			} catch (e) {
				console.log({ error: e });
			}
		};

		fetchCheckIns();
	}, []);

	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Weekly Review</TableCell>
							<TableCell>Images</TableCell>
							<TableCell>Trainer Feedback</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{checkins.length > 0 ? (
							checkins
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((checkin) => (
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

export default CheckInList;
