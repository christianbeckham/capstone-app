import React, { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalDining from "@mui/icons-material/LocalDining";

import EditProfileModal from "../EditProfileModal/EditProfileModal";
import EditPlanModal from "../EditPlanModal/EditPlanModal";

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
		marginTop: theme.spacing(0),
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

const EditProfileOptions = ({ client, fetchClientUser }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id="edit-profile-button"
				aria-controls={open ? "edit-profile-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				Edit
			</Button>
			<StyledMenu
				id="edit-profile-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				autoFocus={false}
				keepMounted
			>
				<MenuItem
					component={EditProfileModal}
					client={client}
					fetchClientUser={fetchClientUser}
					handleClose={handleClose}
					disableRipple
				/>
				<MenuItem
					component={EditPlanModal}
					plan={client?.training_plan}
					fetchClientUser={fetchClientUser}
					handleClose={handleClose}
					disableRipple
				/>
				<MenuItem>
					<LocalDining />
					Macros
				</MenuItem>
			</StyledMenu>
		</div>
	);
};

export default EditProfileOptions;
