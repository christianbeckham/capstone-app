import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import useAuth from "../../../hooks/useAuth";
import RequestListItem from "../RequestListItem/RequestListItem";

const RequestList = () => {
	const [requests, setRequests] = useState([]);
	const [user, token] = useAuth();

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
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Request Type</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.length > 0 ? (
							requests.map((request) => (
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
		</>
	);
};

export default RequestList;
