import React, { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import {
	Box,
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	AppBar,
	Toolbar,
	Typography,
	Slide,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import "react-image-crop/dist/ReactCrop.css";

const EditImageDialog = ({ image }) => {
	const [open, setOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState("");
	const [crop, setCrop] = useState();
	const imgRef = useRef(null);
	const [aspect, setAspect] = useState(16 / 9);

	console.log("image", image);

	const handleOpenDialog = () => {
		setOpen(true);
		onEditSelect();
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const onEditSelect = () => {
		setCrop(undefined);
		const reader = new FileReader();
		reader.onload = () => {
			setImgSrc(reader.result);
		};
		reader.readAsDataURL(image);
	};

	const onImageLoaded = (e) => {
		const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
		console.log(e.currentTarget, width, height);

		const crop = centerCrop(
			makeAspectCrop(
				{
					unit: "%",
					width: 90,
				},
				aspect,
				width,
				height
			),
			width,
			height
		);
		setCrop(crop);
	};

	return (
		<div>
			<IconButton onClick={handleOpenDialog}>
				<Edit />
			</IconButton>
			<Dialog fullScreen open={open} onClose={handleCloseDialog} sx={{ zIndex: 2000 }}>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar sx={{ display: "flex" }}>
						<Typography variant="h6">Edit Image</Typography>
						<Box sx={{ flex: "1 1 auto" }} />
						<IconButton onClick={handleCloseDialog}>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Divider />
				<DialogContent>
					<Box sx={{ bgcolor: "red", maxWidth: 900 }}>
						<ReactCrop
							crop={crop}
							onChange={(_, percentCrop) => setCrop(percentCrop)}
							ruleOfThirds={true}
							// aspect={aspect}
						>
							<Box component="img" ref={imgRef} src={`${imgSrc}`} alt={image.name} onLoad={onImageLoaded} />
						</ReactCrop>
					</Box>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button variant="outlined" color="error">
						Cancel
					</Button>
					<Button color="success">Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditImageDialog;
