import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import useAuth from "../../hooks/useAuth";
import AdminRequestForm from "../../components/AdminRequestForm/AdminRequestForm";

const AdminRequests = () => {
	const [requests, setRequests] = useState([]);
	const [user, token] = useAuth();

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/requests/all/",
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

	return (
		<div>
			<h1>Admin Requests View</h1>
			<br />
			<>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Request Type</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>By</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Response</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{requests.length > 0 ? (
								requests.map((request) => (
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
											{request.status_text.toUpperCase()}
										</TableCell>
										<TableCell align="left">
											{request.response ? "Yes" : "No"}
										</TableCell>
										<TableCell align="left" sx={{ display: "flex" }}>
											<AdminRequestForm requestInfo={request} fetchRequests={fetchRequests} />
											{/* <Button
												size="small"
												color="error"
												onClick={() => deleteRequest(request.id)}
											>
												Delete
											</Button> */}
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
			</>
		</div>
	);
};

export default AdminRequests;
