import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import {
	Box,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	IconButton,
	TextField,
	Menu,
	MenuItem,
	Typography,
	Divider,
} from "@mui/material";
import { Launch, Edit } from "@mui/icons-material";

const statuses = [
	{ value: 1, label: "Open" },
	{ value: 0, label: "Closed" },
];

const RequestForm = ({ requestInfo, fetchRequests }) => {
	const initialData = {
		response: requestInfo.response,
		status: requestInfo.status,
	};
	const { token } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState(initialData);

	const [open, setOpen] = useState(false);
	const handleFormOpen = () => setOpen(true);
	const handleFormClose = () => {
		setEditMode(false);
		setOpen(false);
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

	const handleMenuOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuCancel = () => {
		setFormData(initialData);
		setEditMode(false);
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
		handleMenuClose();
	};

	const handleFormChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postRequest(formData);
		handleFormClose();
	};

	const postRequest = async (data) => {
		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_WEBSITE_URL}/api/requests/all/${requestInfo.id}/`,
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				fetchRequests();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteRequest = async (itemId) => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_WEBSITE_URL}/api/requests/all/${itemId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 204) {
				setFormData({});
				handleFormClose();
				fetchRequests();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<IconButton size="small" onClick={handleFormOpen} aria-label="open form button" color="primary">
				<Launch fontSize="inherit" />
			</IconButton>
			<Dialog open={open} onClose={handleFormClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<Stack direction={"row"} alignItems="center" justifyContent="space-between">
						{editMode ? (
							<DialogTitle>Reply to {requestInfo.user.full_name}</DialogTitle>
						) : (
							<>
								<DialogTitle>Request Details</DialogTitle>
								<Box sx={{ mx: 2 }}>
									<IconButton
										id="edit-button"
										aria-controls={openMenu ? "from-request-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={openMenu ? "true" : undefined}
										onClick={handleMenuOpen}
										size="small"
									>
										<Edit fontSize="inherit" />
									</IconButton>
									<Menu
										id="from-request-menu"
										MenuListProps={{
											"aria-labelledby": "edit-button",
										}}
										anchorEl={anchorEl}
										open={openMenu}
										onClose={handleMenuClose}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "left",
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "center",
										}}
									>
										<MenuItem onClick={toggleEditMode} disableRipple>
											Edit
										</MenuItem>
										<MenuItem onClick={() => deleteRequest(requestInfo.id)} disableRipple>
											Delete
										</MenuItem>
									</Menu>
								</Box>
							</>
						)}
					</Stack>
					<Divider />
					<DialogContent>
						<Stack spacing={2} sx={{ borderRadius: 1, p: 2, backgroundColor: "background.default" }}>
							<Stack direction="row" spacing={1}>
								<Typography variant="body1" sx={{ textTransform: "uppercase" }}>
									Type:
								</Typography>
								<Typography variant="body1" sx={{ textTransform: "capitalize" }}>
									{requestInfo.type}
								</Typography>
							</Stack>
							<Stack>
								<Typography variant="body1" sx={{ textTransform: "uppercase" }}>
									Description:
								</Typography>
								<Typography variant="body1">{requestInfo.description}</Typography>
							</Stack>
						</Stack>

						<Stack spacing={2} sx={{ my: 0, py: 2 }}>
							<Box>
								<Typography>Status</Typography>
								<TextField
									size="small"
									disabled={!editMode}
									fullWidth
									select
									name="status"
									value={formData.status}
									onChange={handleFormChange}
									variant="outlined"
								>
									{statuses.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Box>
							<Box>
								<Typography>Response</Typography>
								<TextField
									disabled={!editMode}
									fullWidth
									type="text"
									name="response"
									value={formData.response}
									onChange={handleFormChange}
									multiline
									rows={4}
									variant="outlined"
									size="small"
								/>
							</Box>
						</Stack>
					</DialogContent>
					<Divider />
					<DialogActions>
						{editMode ? (
							<>
								<Button onClick={handleMenuCancel} variant="outlined" color="error">
									Cancel
								</Button>
								<Button type="submit" color="success">
									Save
								</Button>
							</>
						) : (
							<Button onClick={handleFormClose} variant="outlined" color="error">
								Close
							</Button>
						)}
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default RequestForm;
