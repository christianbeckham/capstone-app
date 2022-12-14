import React, { useState, forwardRef } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Delete from "@mui/icons-material/Delete";

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

const EditPlanModal = forwardRef(
	({ plan, fetchClientUser, handleClose }, ref) => {
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

		const deletePlan = async () => {
			try {
				const response = await axios.delete(
					`http://localhost:8000/api/plans/${plan?.id}/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
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
				<Modal
					open={open}
					onClose={handleModalClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box component={"form"} onSubmit={handleSubmit} sx={style}>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ mb: 1 }}
						>
							<Typography component="h2" variant="h5">
								Edit Plan
							</Typography>
							<IconButton onClick={handleDelete} size="small">
								<Delete fontSize="inherit" />
							</IconButton>
						</Stack>

						<Divider />
						<Stack rowGap={2} sx={{ my: 4 }}>
							<TextField
								label="Goal"
								type="text"
								multiline
								name="goal"
								value={formData.goal || plan?.goal}
								onChange={handleFieldChange}
								rows={4}
								variant="standard"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Cost"
								name="cost"
								value={formData.cost || plan?.cost}
								onChange={handleFieldChange}
								sx={{ width: 100 }}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
									startAdornment: (
										<InputAdornment position="start">$</InputAdornment>
									),
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

export default EditPlanModal;
