import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";

import useAuth from "../../../hooks/useAuth";
import RequestListItem from "../RequestListItem/RequestListItem";

const RequestList = () => {
	const { token } = useAuth();
	const [requests, setRequests] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/requests/",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (response.status === 200) {
					const data = await response.data;
					setRequests(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchRequests();
	}, []);

	return (
		<>
			<TableContainer>
				<Table aria-label="requests table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Request Type</TableCell>
							<TableCell>Description</TableCell>
							<TableCell align="center">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.length > 0 ? (
							requests
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((request) => (
									<RequestListItem key={request.id} request={request} />
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
				rowsPerPageOptions={[5, 10, 15]}
				component="div"
				count={requests.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default RequestList;
