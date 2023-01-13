import React, { useState, forwardRef } from "react";
import axios from "axios";
import {
	Box,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	MenuItem,
	Typography,
	Divider,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";

import useAuth from "../../../hooks/useAuth";

const EditPlanModal = forwardRef(({ plan, fetchClientUser, handleClose }, ref) => {
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

	const handleOpen = () => {
		handleClose();
		setOpen(true);
	};

	const handleModalClose = () => {
		setFormData({
			goal: plan?.goal,
			cost: plan?.cost,
		});
		setOpen(false);
	};

	const handleFieldChange = (e) => {
		e.persist();
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updatePlan(formData);
		setOpen(false);
	};

	const handleDelete = () => {
		deletePlan();
		handleModalClose();
	};

	const updatePlan = async (data) => {
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

	const deletePlan = async () => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_WEBSITE_URL}/api/plans/${plan?.id}/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 204) {
				console.log(response.data);
				fetchClientUser();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<MenuItem onClick={handleOpen}>Plan</MenuItem>
			<Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<DialogTitle>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography component="h2" variant="h5">
								Edit Plan
							</Typography>
							<IconButton onClick={handleDelete} size="small">
								<Delete fontSize="inherit" />
							</IconButton>
						</Stack>
					</DialogTitle>
					<Divider />
					<DialogContent>
						<Stack rowGap={2}>
							<TextField
								label="Goal"
								type="text"
								multiline
								name="goal"
								value={formData.goal || plan?.goal}
								onChange={handleFieldChange}
								rows={4}
							/>
							<TextField
								label="Cost"
								name="cost"
								value={formData.cost || plan?.cost}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
								}}
							/>
						</Stack>
					</DialogContent>
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

export default EditPlanModal;
