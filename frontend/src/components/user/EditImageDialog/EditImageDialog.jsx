import React, { useState } from "react";
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
	const [aspect, setAspect] = useState(16 / 9);
	const [output, setOutput] = useState(null);
	const [imageRef, setImageRef] = useState(null);

	const handleOpenDialog = () => {
		setOpen(true);
		onEditSelect();
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const onEditSelect = () => {
		setImgSrc(URL.createObjectURL(image));
	};

	const onImageLoaded = (e) => {
		const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

		const crop = centerCrop(
			makeAspectCrop(
				{
					unit: "%",
					width: 50,
				},
				aspect,
				width,
				height
			),
			width,
			height
		);
		setCrop(crop);
		setImageRef(e.currentTarget);
	};

	const cropImageNow = () => {
		const canvas = document.createElement("canvas");
		const scaleX = imageRef?.naturalWidth / imageRef?.width;
		const scaleY = imageRef?.naturalHeight / imageRef?.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext("2d");

		const pixelRatio = window.devicePixelRatio;
		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = "high";

		ctx.drawImage(
			imageRef,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		const base64Image = canvas.toDataURL("image/jpeg");
		setOutput(base64Image);
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
					<Box sx={{ maxWidth: 900 }}>
						<ReactCrop
							crop={crop}
							onChange={setCrop}
							ruleOfThirds={true}
							// aspect={aspect}
						>
							<Box component="img" src={`${imgSrc}`} alt={image.name} onLoad={onImageLoaded} />
						</ReactCrop>
					</Box>
					<Button onClick={cropImageNow}>Crop</Button>
					<div>{output && <img src={output} alt={image.name} />}</div>
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
