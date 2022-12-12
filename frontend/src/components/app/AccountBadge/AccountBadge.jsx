import React, { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import useAuth from "../../../hooks/useAuth";

const AccountBadge = () => {
	const { token } = useAuth();
	const [account, setAccount] = useState({});

	const fetchAccount = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/auth/me/", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				setAccount(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAccount();
	}, []);

	return (
		<Box sx={{ m: 2 }}>
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					p: 2,
					backgroundColor: "action.disabledBackground",
					borderRadius: 2,
				}}
			>
				<Avatar alt="profile avatar" sx={{ width: 24, height: 24 }} />
				<Box sx={{ ml: 2 }}>
					<Typography variant="subtitle2" sx={{ color: "text.primary" }}>
						{account?.full_name}
					</Typography>
					<Typography variant="caption" sx={{ color: "text.primary" }}>
						{account?.email}
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
};

export default AccountBadge;
