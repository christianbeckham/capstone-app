import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import useAuth from "../../hooks/useAuth";

const AdminCheckIns = () => {
	const [checkins, setCheckins] = useState([]);
	const [user, token] = useAuth();

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/checkins/all/",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (response.status === 200) {
					const data = await response.data;
					setCheckins(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchRequests();
	}, []);

	const editCheckin = (checkIn) => {
		console.log(checkIn);
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
				const tempArray = checkins.filter((check) => check.id !== checkInId);
				setCheckins(tempArray);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Admin Check-Ins</h1>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>By</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Client Review</TableCell>
							<TableCell>Images</TableCell>
							<TableCell>Trainer Feedback</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{checkins.length > 0 ? (
							checkins.map((check) => (
								<TableRow
									key={check.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{check.id}
									</TableCell>
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
		</div>
	);
};

export default AdminCheckIns;
