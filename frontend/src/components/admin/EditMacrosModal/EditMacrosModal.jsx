import React, { useState, forwardRef } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import useAuth from "../../../hooks/useAuth";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	borderRadius: "5px",
	boxShadow: 24,
	p: 4,
};

const EditMacrosModal = forwardRef(
	({ plan, fetchClientUser, handleClose }, ref) => {
		const { token } = useAuth();
		const [open, setOpen] = useState(false);
		const [formData, setFormData] = useState({
			calories: plan?.calories,
			protein: plan?.protein,
			carbs: plan?.carbs,
			fats: plan?.fats,
		});

		const handleOpen = () => {
			handleClose();
			setOpen(true);
		};

		const handleModalClose = () => {
			setFormData({});
			setOpen(false);
		};

		const handleFieldChange = (e) => {
			e.persist();
			setFormData((prevState) => ({
				...prevState,
				[e.target.name]: Number(e.target.value),
			}));
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			postUpdate(formData);
			setOpen(false);
		};

		const postUpdate = async (data) => {
			try {
				const response = await axios.patch(
					`http://localhost:8000/api/plans/${plan?.id}/`,
					data,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.status === 200) {
					console.log(response.data);
					fetchClientUser();
				}
			} catch (error) {
				console.log(error);
			}
		};

		return (
			<div>
				<MenuItem onClick={handleOpen}>Macros</MenuItem>
				<Modal
					open={open}
					onClose={handleModalClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box component={"form"} onSubmit={handleSubmit} sx={style}>
						<h2>Edit Macros</h2>
						<Divider />
						<Stack direction="row" spacing={2} sx={{ my: 4 }}>
							<TextField
								label="Calories"
								name="calories"
								value={formData.calories || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
								variant="standard"
							/>
							<TextField
								label="Protein"
								name="protein"
								value={formData.protein || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
								variant="standard"
							/>
							<TextField
								label="Carbs"
								name="carbs"
								value={formData.carbs || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
								variant="standard"
							/>
							<TextField
								label="Fats"
								name="fats"
								value={formData.fats || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
								variant="standard"
							/>
						</Stack>
						<Stack direction="row" spacing={1} sx={{ float: "right" }}>
							<Button type="submit" variant="contained" color="success">
								Save
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={handleModalClose}
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				</Modal>
			</div>
		);
	}
);

export default EditMacrosModal;
