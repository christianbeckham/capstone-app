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

import useAuth from "../../hooks/useAuth";
import ImageList from "../ImageList/ImageList";

const CheckInForm = ({ showForm, toggleForm }) => {
	const [user, token] = useAuth();
	const [images, setImages] = useState(null);
	const [formData, setFormData] = useState({ weight: "", feedback: "" });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log(formData);
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleImageChange = (e) => {
		setImages(e.target.files);
	};

	const handleClose = () => {
		setFormData({ weight: "", feedback: "" });
		setImages(null);
		toggleForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = "http://localhost:8000/api/checkins/";
		const form_data = new FormData();
		form_data.append("weight", formData.weight);
		form_data.append("feedback", formData.feedback);

		if (images != null) {
			Object.values(images).forEach((img) => {
				form_data.append("images", img);
			});
		}

		try {
			const response = axios.post(url, form_data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response === 201) {
				console.log("Response", response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Drawer
			anchor={"right"}
			open={showForm}
			onClose={toggleForm}
			sx={{ zIndex: 2000 }}
		>
			<Box
				component="form"
				onSubmit={handleSubmit}
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
					label="Feedback"
					type="text"
					name="feedback"
					value={formData.feedback}
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
						onChange={handleImageChange}
					/>
				</Button>
				{images && <ImageList images={images} />}
				<Stack direction="row" sx={{ my: 2, position: "absolute", bottom: 0 }}>
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
					<div></div>
				</Stack>
			</Box>
		</Drawer>
	);
};

export default CheckInForm;
