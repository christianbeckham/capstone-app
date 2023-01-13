import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import {
	Box,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	MenuItem,
	FormGroup,
	FormControlLabel,
	Switch,
	Divider,
} from "@mui/material";

import useAuth from "../../../hooks/useAuth";

const EditProfileModal = forwardRef(({ client, fetchClientUser, handleClose }, ref) => {
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

	const handleOpen = () => {
		handleClose();
		setOpen(true);
	};

	const handleModalClose = () => {
		setFormData({
			username: client?.username,
			email: client?.email,
			first_name: client?.first_name,
			last_name: client?.last_name,
			is_active: client?.is_active,
		});
		setOpen(false);
	};

	const handleFieldChange = (e) => {
		e.persist();
		if (e.target.type === "checkbox") {
			setFormData((prevState) => ({
				...prevState,
				[e.target.name]: e.target.checked,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value,
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postUpdate(formData);
		setOpen(false);
	};

	const postUpdate = async (data) => {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_WEBSITE_URL}/api/auth/clients/${client?.id}/`, data, {
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

	useEffect(() => {
		setFormData({
			username: client?.username,
			email: client?.email,
			first_name: client?.first_name,
			last_name: client?.last_name,
			is_active: client?.is_active,
		});
	}, [client]);

	return (
		<div>
			<MenuItem onClick={handleOpen}>Profile</MenuItem>
			<Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<DialogTitle>Edit Profile</DialogTitle>
					<Divider />
					<DialogContent>
						<Stack rowGap={2}>
							<Stack direction={"row"} columnGap={2}>
								<TextField
									label="First name"
									type="text"
									name="first_name"
									value={formData?.first_name}
									onChange={handleFieldChange}
									sx={{ width: "100%" }}
								/>
								<TextField
									label="Last name"
									type="text"
									name="last_name"
									value={formData?.last_name}
									onChange={handleFieldChange}
									sx={{ width: "100%" }}
								/>
							</Stack>
							<TextField
								label="Username"
								type="text"
								name="username"
								value={formData?.username}
								onChange={handleFieldChange}
							/>
							<TextField label="Email" type="email" name="email" value={formData?.email} onChange={handleFieldChange} />
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											name="is_active"
											checked={formData?.is_active}
											onChange={handleFieldChange}
											color={formData?.is_active ? "success" : "error"}
											inputProps={{ "aria-label": "controlled" }}
										/>
									}
									sx={{ m: 0 }}
									label="Active"
									labelPlacement="start"
								/>
							</FormGroup>
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

export default EditProfileModal;
