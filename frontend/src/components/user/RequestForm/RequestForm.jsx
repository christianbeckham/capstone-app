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

const RequestForm = () => {
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		type: requestTypes[0],
		description: "",
	});
	const { token } = useAuth();

	const toggleForm = () => setShowForm(!showForm);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(formData, name, value);
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleClose = () => {
		setFormData({ type: "", description: "" });
		toggleForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postRequest(formData);
		handleClose();
	};

	const postRequest = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/requests/",
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 201) {
				console.log(response);
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
			<Drawer
				variant="temporary"
				anchor={"right"}
				open={showForm}
				onClose={toggleForm}
			>
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
					sx={{ minWidth: 650, display: "flex", flexDirection: "column", m: 2 }}
				>
					<Stack sx={{ display: "flex" }} spacing={2}>
						<TextField
							label="Type"
							select
							name="type"
							value={formData.type}
							onChange={handleChange}
							variant="standard"
							margin="normal"
							required
							helperText="Please select an option"
							InputLabelProps={{
								shrink: true,
							}}
							sx={{ textTransform: "capitalize" }}
						>
							{requestTypes.map((option, index) => (
								<MenuItem
									key={index}
									value={option}
									sx={{ textTransform: "capitalize" }}
								>
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
							variant="standard"
							margin="normal"
							required
							multiline
							rows={3}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Stack>
					<Stack
						direction="row"
						sx={{ my: 2, position: "absolute", bottom: 0 }}
					>
						<Button
							type="submit"
							variant="contained"
							color="success"
							sx={{ my: 2, mr: 1 }}
						>
							Submit
						</Button>
						<Button
							onClick={handleClose}
							variant="contained"
							color="error"
							sx={{ my: 2 }}
						>
							Cancel
						</Button>
					</Stack>
				</Box>
			</Drawer>
		</>
	);
};

export default RequestForm;
