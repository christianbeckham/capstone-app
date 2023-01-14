import React, { useState, forwardRef } from "react";
import axios from "axios";
import {
	Box,
	Stack,
	Dialog,
	TextField,
	Button,
	MenuItem,
	DialogTitle,
	DialogContent,
	DialogActions,
	Divider,
} from "@mui/material";

import useAuth from "../../../hooks/useAuth";

const EditMacrosModal = forwardRef(({ plan, fetchClientUser, handleClose }, ref) => {
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
			const response = await axios.patch(`${process.env.REACT_APP_WEBSITE_URL}/api/plans/${plan?.id}/`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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
			<Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<DialogTitle>Edit Macros</DialogTitle>
					<Divider />
					<DialogContent>
						<Stack direction="row" spacing={2}>
							<TextField
								label="Calories"
								name="calories"
								value={formData.calories || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
							/>
							<TextField
								label="Protein"
								name="protein"
								value={formData.protein || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
							/>
							<TextField
								label="Carbs"
								name="carbs"
								value={formData.carbs || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
							/>
							<TextField
								label="Fats"
								name="fats"
								value={formData.fats || ""}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
							/>
						</Stack>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Button variant="outlined" color="error" onClick={handleModalClose}>
							Cancel
						</Button>
						<Button type="submit" color="success">
							Save
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
});

export default EditMacrosModal;
