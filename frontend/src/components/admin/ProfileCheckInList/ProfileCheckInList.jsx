import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Box,
	Stack,
	Typography,
	Pagination,
	IconButton,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import useAuth from "../../../hooks/useAuth";

const ProfileCheckInList = ({ userId }) => {
	const { token } = useAuth();
	const [checkins, setCheckins] = useState([]);
	const [page, setPage] = useState(1);
	// eslint-disable-next-line no-unused-vars
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const fetchUserCheckIns = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_WEBSITE_URL}/api/checkins/all/?user_id=${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setCheckins(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (userId !== undefined) fetchUserCheckIns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	const emptyRows = page > 1 ? Math.max(0, page * rowsPerPage - checkins?.length) : 0;

	return (
		<>
			{checkins?.length > 0 ? (
				<>
					<TableContainer>
						<Table aria-label="check-ins table">
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell>Images</TableCell>
									<TableCell>View</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{checkins.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((c) => (
									<TableRow key={c.id}>
										<TableCell>{new Date(c?.created_date).toLocaleDateString()}</TableCell>
										<TableCell>{c.images.length}</TableCell>
										<TableCell>
											<IconButton
												component={Link}
												to={`/a/checkins/${c.id}`}
												aria-label="view check-in"
												color="primary"
												size="small"
											>
												<ExitToApp fontSize="inherit" />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
								{emptyRows > 0 && (
									<TableRow sx={{ height: 43 * emptyRows, "& td": { backgroundColor: "transparent" } }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<Stack direction="row" alignItems={"center"} justifyContent="space-between">
						<Typography variant="caption" component="div" color="text.secondary" sx={{ mx: 2 }}>
							Total: {checkins.length}
						</Typography>
						<Pagination
							size="small"
							count={Math.ceil(checkins.length / rowsPerPage)}
							page={page}
							onChange={handleChangePage}
						/>
					</Stack>
				</>
			) : (
				<Box sx={{ m: 1 }}>
					<Typography>No check-ins available</Typography>
				</Box>
			)}
		</>
	);
};

export default ProfileCheckInList;
