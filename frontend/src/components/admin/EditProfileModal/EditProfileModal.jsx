import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccountCircle from "@mui/icons-material/AccountCircle";

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

const EditProfileModal = forwardRef(
	({ client, fetchClientUser, handleClose }, ref) => {
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
				const response = await axios.patch(
					`http://localhost:8000/api/auth/clients/${client?.id}/`,
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
				<MenuItem onClick={handleOpen}>
					<AccountCircle />
					Profile
				</MenuItem>
				<Modal
					open={open}
					onClose={handleModalClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box component={"form"} onSubmit={handleSubmit} sx={style}>
						<h2>Edit Profile</h2>
						<Divider />
						<Stack rowGap={2} sx={{ my: 4 }}>
							<Stack direction={"row"} columnGap={2}>
								<TextField
									variant="standard"
									label="First name"
									type="text"
									name="first_name"
									value={formData?.first_name}
									onChange={handleFieldChange}
									InputLabelProps={{
										shrink: true,
									}}
									sx={{ width: "100%" }}
								/>
								<TextField
									variant="standard"
									label="Last name"
									type="text"
									name="last_name"
									value={formData?.last_name}
									onChange={handleFieldChange}
									InputLabelProps={{
										shrink: true,
									}}
									sx={{ width: "100%" }}
								/>
							</Stack>
							<TextField
								variant="standard"
								label="Username"
								type="text"
								name="username"
								value={formData?.username}
								onChange={handleFieldChange}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								variant="standard"
								label="Email"
								type="email"
								name="email"
								value={formData?.email}
								onChange={handleFieldChange}
								InputLabelProps={{
									shrink: true,
								}}
							/>
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

export default EditProfileModal;
