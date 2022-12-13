import React, { useState } from "react";
import axios from "axios";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Edit from "@mui/icons-material/Edit";

import useAuth from "../../../hooks/useAuth";

const statuses = [
	{ value: 1, label: "Open" },
	{ value: 0, label: "Closed" },
];

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 120,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

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
		console.log(formData);
		postRequest(formData);
		handleFormClose();
		fetchRequests();
	};

	const postRequest = async (data) => {
		try {
			const response = await axios.patch(
				`http://localhost:8000/api/requests/all/${requestInfo.id}/`,
				data,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteRequest = async (itemId) => {
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/requests/all/${itemId}/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 204) {
				console.log(response.data);
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
			<IconButton
				onClick={handleFormOpen}
				aria-label="open form button"
				color="primary"
			>
				<ExitToApp />
			</IconButton>
			<Dialog open={open} onClose={handleFormClose} maxWidth="sm" fullWidth>
				<Box component={"form"} onSubmit={handleSubmit}>
					<Stack
						direction={"row"}
						alignItems="center"
						justifyContent="space-between"
					>
						{editMode ? (
							<DialogTitle>Reply to {requestInfo.user.full_name}</DialogTitle>
						) : (
							<DialogTitle>
								Request from {requestInfo.user.full_name}
							</DialogTitle>
						)}
						<Box sx={{ mx: 2 }}>
							<IconButton
								aria-controls={openMenu ? "from-request-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={openMenu ? "true" : undefined}
								onClick={handleMenuOpen}
								size="small"
							>
								<Edit fontSize="inherit" />
							</IconButton>
							<StyledMenu
								id="demo-customized-menu"
								MenuListProps={{
									"aria-labelledby": "demo-customized-button",
								}}
								anchorEl={anchorEl}
								open={openMenu}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={toggleEditMode} disableRipple>
									Edit
								</MenuItem>
								<MenuItem
									onClick={() => deleteRequest(requestInfo.id)}
									disableRipple
								>
									Delete
								</MenuItem>
							</StyledMenu>
						</Box>
					</Stack>
					<DialogContent>
						<DialogContentText>Request Details</DialogContentText>
						<Divider sx={{ my: 1 }} />
						<Stack spacing={1} sx={{ my: 2 }}>
							<Typography sx={{ textTransform: "capitalize" }}>
								Type: {requestInfo.type}
							</Typography>
							<Typography>Description: {requestInfo.description}</Typography>
						</Stack>
						<Divider sx={{ my: 2 }} />
						<Stack spacing={2} sx={{ my: 2 }}>
							<TextField
								disabled={!editMode}
								fullWidth
								variant="standard"
								select
								label="Status"
								name="status"
								value={formData.status}
								onChange={handleFormChange}
								InputLabelProps={{
									shrink: true,
								}}
							>
								{statuses.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								disabled={!editMode}
								fullWidth
								variant="standard"
								type="text"
								label="Response"
								name="response"
								value={formData.response}
								onChange={handleFormChange}
								multiline
								rows={4}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						{editMode ? (
							<Stack direction={"row"} spacing={1}>
								<Button type="submit" variant="contained" color="success">
									Save
								</Button>
								<Button
									onClick={handleMenuCancel}
									variant="contained"
									color="error"
								>
									Cancel
								</Button>
							</Stack>
						) : (
							<Button
								onClick={handleFormClose}
								variant="contained"
								color="error"
							>
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
