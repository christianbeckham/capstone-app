import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AdminClientList = ({ clients }) => {
	const editClient = () => alert("Edit action");
	const deleteClient = () => alert("Deleted action");

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell align="left">Full Name</TableCell>
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Username</TableCell>
						<TableCell align="left">Date Joined</TableCell>
						<TableCell align="left"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{clients.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="left">{row.full_name}</TableCell>
							<TableCell align="left">{row.email}</TableCell>
							<TableCell align="left">{row.username}</TableCell>
							<TableCell align="left">
								{new Date(row?.date_joined).toLocaleDateString()}
							</TableCell>
							<TableCell align="left" sx={{ display: "flex" }}>
								<Button size="small" component={Link} to={`${row.id}`}>
									View
								</Button>
								{/* <Button size="small" color="success" onClick={editClient}>
									Edit
								</Button>
								<Button size="small" color="error" onClick={deleteClient}>
									Delete
								</Button> */}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default AdminClientList;
