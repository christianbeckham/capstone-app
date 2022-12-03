import React, { useState, forwardRef } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Assignment from "@mui/icons-material/Assignment";

import useAuth from "../../../hooks/useAuth";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "1px solid #aeaeae",
	borderRadius: "5px",
	boxShadow: 24,
	p: 4,
};

const EditPlanModal = forwardRef(
	({ plan, fetchClientUser, handleClose }, ref) => {
		const [user, token] = useAuth();
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
				<MenuItem onClick={handleOpen}>
					<Assignment />
					Plan
				</MenuItem>
				<Modal
					open={open}
					onClose={handleModalClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box component={"form"} onSubmit={handleSubmit} sx={style}>
						<h2>Edit Plan Modal</h2>
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
						<Box sx={{ float: "right" }}>
							<Button type="submit" variant="contained">
								Save
							</Button>
							<Button variant="contained" onClick={handleModalClose}>
								Cancel
							</Button>
						</Box>
					</Box>
				</Modal>
			</div>
		);
	}
);

export default EditPlanModal;
