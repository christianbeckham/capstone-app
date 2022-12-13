import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";

import EditProfileModal from "../EditProfileModal/EditProfileModal";
import EditPlanModal from "../EditPlanModal/EditPlanModal";
import EditMacrosModal from "../EditMacrosModal/EditMacrosModal";

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
			<Chip
				id="edit-profile-button"
				label={"Edit"}
				aria-controls={open ? "edit-profile-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				onClick={handleClick}
				size="small"
				color="primary"
			/>
			<Menu
				id="edit-profile-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				autoFocus={false}
				keepMounted
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				PaperProps={{
					elevation: 0,
					sx: {
						width: "auto",
						mt: 1,
						px: 1,
						overflow: "visible",
						filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.25))",
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
			>
				<MenuItem
					component={EditProfileModal}
					client={client}
					fetchClientUser={fetchClientUser}
					handleClose={handleClose}
					disableRipple
				/>
				{client?.training_plan && (
					<MenuItem
						component={EditPlanModal}
						plan={client?.training_plan}
						fetchClientUser={fetchClientUser}
						handleClose={handleClose}
						disableRipple
					/>
				)}
				{client?.training_plan && (
					<MenuItem
						component={EditMacrosModal}
						plan={client?.training_plan}
						fetchClientUser={fetchClientUser}
						handleClose={handleClose}
						disableRipple
					/>
				)}
			</Menu>
		</div>
	);
};

export default EditProfileOptions;
