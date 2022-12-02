import React, { useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Add from "@mui/icons-material/Add";

import useAuth from "../../../hooks/useAuth";
import ImageList from "../ImageList/ImageList";

const CheckInForm = () => {
	const [user, token] = useAuth();
	const [images, setImages] = useState(null);
	const [formData, setFormData] = useState({ weight: "", weekly_review: "" });
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => setShowForm(!showForm);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleImageUpload = (e) => {
		setImages(e.target.files);
	};

	const handleFormClose = () => {
		setFormData({ weight: "", weekly_review: "" });
		setImages(null);
		setShowForm(false);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const form_data = new FormData();
		form_data.append("weight", formData.weight);
		form_data.append("weekly_review", formData.weekly_review);

		if (images != null) {
			Object.values(images).forEach((img) => {
				form_data.append("images", img);
			});
		}

		// console.log("form data: ", form_data.getAll('images'));
		postCheckIn(form_data);
		handleFormClose();
	};

	const postCheckIn = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/checkins/",
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 201) {
				console.log("Response", response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button variant="outlined" startIcon={<Add />} onClick={toggleForm}>
				New
			</Button>
			<Drawer
				anchor={"right"}
				open={showForm}
				onClose={toggleForm}
				sx={{ zIndex: 2000 }}
			>
				<Box
					component="form"
					onSubmit={handleFormSubmit}
					sx={{
						minWidth: 650,
						display: "flex",
						flexDirection: "column",
						m: 4,
						position: "relative",
						height: "100%",
					}}
				>
					<Typography component={"h1"} variant="h5">
						New check-in
					</Typography>
					<TextField
						label="Check-In Weight"
						type="number"
						name="weight"
						value={formData.weight}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						InputProps={{
							endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						label="Weekly Review"
						type="text"
						name="weekly_review"
						value={formData.weekly_review}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						multiline
						rows={4}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button
						variant="outlined"
						startIcon={<PhotoCamera />}
						component="label"
					>
						Upload
						<input
							hidden
							accept="image/png, image/jpeg"
							multiple
							type="file"
							onChange={handleImageUpload}
						/>
					</Button>
					{images && <ImageList images={images} />}
					<Stack
						direction="row"
						sx={{ my: 0, position: "absolute", bottom: 0 }}
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
							onClick={handleFormClose}
							variant="outlined"
							color="error"
							sx={{ my: 2 }}
						>
							Cancel
						</Button>
						<div></div>
					</Stack>
				</Box>
			</Drawer>
		</>
	);
};

export default CheckInForm;
