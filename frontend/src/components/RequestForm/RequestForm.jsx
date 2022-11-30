import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import useAuth from "../../hooks/useAuth";

const RequestForm = ({ showForm, toggleForm }) => {
	const [formData, setFormData] = useState({ type: "", description: "" });
	const [user, token] = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(formData);
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
			<Drawer
				anchor={"right"}
				open={showForm}
				onClose={toggleForm}
				sx={{ zIndex: 2000 }}
			>
				<Box
					component="form"
					onSubmit={handleSubmit}
					role="presentation"
					sx={{ minWidth: 650, display: "flex", flexDirection: "column", m: 4 }}
				>
					<Typography component={"h1"} variant="h5">
						New request
					</Typography>
					<Stack sx={{ display: "flex" }} spacing={2}>
						<TextField
							label="Type"
							select
							name="type"
							value={"" || formData.type}
							onChange={handleChange}
							variant="standard"
							margin="normal"
							required
							helperText="Please select an option"
							SelectProps={{
								native: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						>
							{["New plan", "New workout", "New exercise", "Other"].map(
								(option, index) => (
									<option key={index} value={option}>
										{option}
									</option>
								)
							)}
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
							variant="outlined"
							color="success"
							sx={{ my: 2, mr: 1 }}
						>
							Submit
						</Button>
						<Button
							onClick={handleClose}
							variant="outlined"
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
