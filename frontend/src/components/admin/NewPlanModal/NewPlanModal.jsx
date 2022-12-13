import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

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

const NewPlanModal = ({ userId, fetchClientUser }) => {
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		goal: "",
		calories: 0,
		protein: 0,
		carbs: 0,
		fats: 0,
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleModalClose = () => {
		setFormData({ goal: "" });
		setOpen(false);
	};

	const handleFieldChange = (e) => {
		e.persist();
		let value = e.target.value;
		if (e.target.name === "cost") value = Number(value);
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const finalData = {
			user_id: userId,
			...formData,
		};
		console.log(finalData);
		postPlan(finalData);
		setOpen(false);
		handleModalClose();
	};

	const postPlan = async (data) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/api/plans/all/`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 201) {
				console.log(response.data);
				fetchClientUser();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				<Add />
				Create Plan
			</Button>
			<Modal
				open={open}
				onClose={handleModalClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component={"form"} onSubmit={handleSubmit} sx={style}>
					<h2>New Plan</h2>
					<Divider />
					<Stack spacing={4} sx={{ my: 4 }}>
						<TextField
							label="Cost"
							name="cost"
							value={formData.cost || 0}
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
						<TextField
							label="Goal"
							type="text"
							multiline
							name="goal"
							value={formData.goal}
							onChange={handleFieldChange}
							rows={4}
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Stack>
					<Stack direction="row" spacing={2} sx={{ my: 4 }}>
						<TextField
							label="Calories"
							name="calories"
							value={formData.calories}
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
							value={formData.protein}
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
							value={formData.carbs}
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
							value={formData.fats}
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
							Create
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
};

export default NewPlanModal;
