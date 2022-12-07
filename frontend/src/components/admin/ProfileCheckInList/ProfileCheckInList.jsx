import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

import useAuth from "../../../hooks/useAuth";

const ProfileCheckInList = ({ userId }) => {
	const [user, token] = useAuth();
	const [checkins, setCheckins] = useState([]);

	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const fetchUserCheckIns = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/checkins/all/?user_id=${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log("Profile CheckIns List", response.data);
				setCheckins(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserCheckIns();
	}, []);

	return (
		<div>
			<Typography variant="h5" color="text.primary" sx={{ my: 1 }}>
				Check-Ins
			</Typography>
			<Divider />
			{checkins
				.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
				.map((c) => (
					<Card key={c.id} sx={{ p: 1, my: 1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<p>{new Date(c?.created_date).toLocaleDateString()}</p>
							<Button
								size="small"
								component={Link}
								to={`/admin/checkins/${c.id}`}
							>
								View
							</Button>
						</Box>
					</Card>
				))}
			<Stack
				direction="row"
				alignItems={"center"}
				justifyContent="space-between"
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
					sx={{ mx: 2 }}
				>
					Total: {checkins.length}
				</Typography>
				<Pagination
					size="small"
					count={Math.ceil(checkins.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
				/>
			</Stack>
		</div>
	);
};

export default ProfileCheckInList;
