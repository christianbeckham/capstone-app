import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";

import useAuth from "../../../hooks/useAuth";
import { requestTypes } from "../../../utils/requestTypes";

const RequestForm = ({ fetchRequests }) => {
	const initialState = { type: requestTypes[0], description: "" };
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const { token } = useAuth();

	const toggleForm = () => setShowForm(!showForm);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleClose = () => {
		setFormData(initialState);
		toggleForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postRequest(formData);
		handleClose();
	};

	const postRequest = async (data) => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_WEBSITE_URL}/api/requests/`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 201) {
				console.log(response);
				fetchRequests();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		console.log("Request form loaded");
	}, []);

	return (
		<>
			<Tooltip title="new" placement="right" arrow>
				<Fab color="primary" size="small" onClick={toggleForm}>
					<Add />
				</Fab>
			</Tooltip>
			<Drawer variant="temporary" anchor={"right"} open={showForm} onClose={handleClose}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						m: 2,
					}}
				>
					<Typography variant="h4">New Request</Typography>
					<IconButton color="inherit" onClick={handleClose} edge="end">
						<Close />
					</IconButton>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmit}
					role="presentation"
					sx={{ minWidth: 650, display: "flex", flexDirection: "column", m: 2, position: "relative", height: "100%" }}
				>
					<Stack sx={{ display: "flex" }} spacing={2}>
						<TextField
							label="Type"
							select
							name="type"
							value={formData.type}
							onChange={handleChange}
							required
							helperText="Please select an option"
							sx={{ textTransform: "capitalize" }}
						>
							{requestTypes.map((option, index) => (
								<MenuItem key={index} value={option} sx={{ textTransform: "capitalize" }}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="Description"
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							multiline
							rows={3}
						/>
					</Stack>
					<Stack direction="row" spacing={1} sx={{ position: "absolute", bottom: 0, right: 0, alignItems: "center" }}>
						<Button onClick={handleClose} variant="outlined" color="error">
							Cancel
						</Button>
						<Button type="submit" color="success">
							Submit
						</Button>
					</Stack>
				</Box>
			</Drawer>
		</>
	);
};

export default RequestForm;
