import React, { useState } from "react";
import axios from "axios";
import {
	Box,
	Stack,
	Dialog,
	TextField,
	InputAdornment,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Divider,
} from "@mui/material";
import Add from "@mui/icons-material/Add";

import useAuth from "../../../hooks/useAuth";

const NewPlanModal = ({ userId, fetchClientUser }) => {
	const initialData = {
		goal: "",
		calories: "",
		protein: "",
		carbs: "",
		fats: "",
		cost: "",
	};
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState(initialData);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleModalClose = () => {
		setFormData(initialData);
		setOpen(false);
	};

	const handleFieldChange = (e) => {
		e.persist();
		let value = e.target.value;
		if (e.target.name !== "goal") value = Number(value);
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
			const response = await axios.post(`${process.env.REACT_APP_WEBSITE_URL}/api/plans/all/`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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
			<Button variant="contained" onClick={handleOpen} startIcon={<Add />}>
				Create Plan
			</Button>
			<Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<DialogTitle>New Plan</DialogTitle>
					<Divider />
					<DialogContent>
						<Stack spacing={2}>
							<>
								<Typography variant="h6">Goal</Typography>
								<TextField
									fullWidth
									type="text"
									multiline
									name="goal"
									value={formData.goal}
									onChange={handleFieldChange}
									rows={4}
									variant="outlined"
									required
								/>
							</>
							<>
								<Typography variant="h6">Macros</Typography>
								<Stack direction="row" spacing={2} sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
									<TextField
										required
										label="Calories"
										name="calories"
										value={formData.calories}
										onChange={handleFieldChange}
										sx={{ width: 100 }}
										InputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
										}}
									/>
									<TextField
										required
										label="Protein"
										name="protein"
										value={formData.protein}
										onChange={handleFieldChange}
										sx={{ width: 100 }}
										InputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
										}}
									/>
									<TextField
										required
										label="Carbs"
										name="carbs"
										value={formData.carbs}
										onChange={handleFieldChange}
										sx={{ width: 100 }}
										InputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
										}}
									/>
									<TextField
										required
										label="Fats"
										name="fats"
										value={formData.fats}
										onChange={handleFieldChange}
										sx={{ width: 100 }}
										InputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
										}}
									/>
								</Stack>
							</>
							<>
								<Typography variant="h6">Cost</Typography>
								<Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
									<TextField
										required
										name="cost"
										value={formData.cost}
										onChange={handleFieldChange}
										sx={{ width: 100 }}
										InputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
											startAdornment: <InputAdornment position="start">$</InputAdornment>,
										}}
									/>
								</Box>
							</>
						</Stack>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button variant="outlined" color="error" onClick={handleModalClose}>
							Cancel
						</Button>
						<Button type="submit" color="success">
							Create
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default NewPlanModal;
