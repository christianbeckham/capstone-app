import React, { useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";

import useAuth from "../../../hooks/useAuth";
import ImageList from "../ImageList/ImageList";

const CheckInForm = ({ fetchCheckIns }) => {
	const { token } = useAuth();
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
				fetchCheckIns();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Tooltip title="new" placement="right" arrow>
				<Fab
					color="primary"
					size="small"
					onClick={toggleForm}
					data-test="new-checkin-button"
				>
					<Add />
				</Fab>
			</Tooltip>
			<Drawer
				anchor={"right"}
				open={showForm}
				onClose={toggleForm}
				sx={{ zIndex: 2000 }}
				data-test="new-checkin-form"
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						m: 2,
					}}
				>
					<Typography variant="h4">New Check-In</Typography>
					<IconButton color="inherit" onClick={handleFormClose} edge="end">
						<Close />
					</IconButton>
				</Box>
				<Box
					component="form"
					onSubmit={handleFormSubmit}
					sx={{
						minWidth: 650,
						display: "flex",
						flexDirection: "column",
						m: 2,
						position: "relative",
						height: "100%",
					}}
				>
					<TextField
						label="Check-In Weight"
						name="weight"
						value={formData.weight}
						onChange={handleInputChange}
						variant="standard"
						margin="normal"
						required
						InputProps={{
							inputMode: "numeric",
							pattern: "[0-9]*",
							endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
						}}
						InputLabelProps={{
							shrink: true,
						}}
						data-test="checkin-form-weight-field"
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
						data-test="checkin-form-review-field"
					/>
					<Button
						variant="contained"
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
							variant="contained"
							color="success"
							sx={{ my: 2, mr: 1 }}
							data-test="checkin-form-submit-button"
						>
							Submit
						</Button>
						<Button
							onClick={handleFormClose}
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

export default CheckInForm;
