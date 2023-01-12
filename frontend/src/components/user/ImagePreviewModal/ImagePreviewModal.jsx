import React, { useState } from "react";
import {
	Box,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { Close, ZoomIn } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ImagePreviewModal = ({ image }) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handlePreview = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<IconButton edge="end" aria-label="preview" onClick={handlePreview}>
				<ZoomIn />
			</IconButton>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="img-preview-dialog-title">
				<DialogTitle
					id="img-preview-dialog-title"
					sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
				>
					<Typography component="p" variant="h4">{`${image.image.split("/").slice(-1)}`}</Typography>
					<IconButton color="inherit" onClick={handleClose}>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
				>
					<Box
						component="img"
						src={`${process.env.REACT_APP_WEBSITE_URL}${image.image}`}
						alt={`${image.image.split("/").slice(-1)}`}
						sx={{ maxHeight: 500, width: "auto" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
						close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ImagePreviewModal;
