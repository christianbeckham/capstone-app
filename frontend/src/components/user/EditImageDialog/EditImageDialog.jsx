import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import {
	Box,
	Stack,
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	AppBar,
	Toolbar,
	Typography,
	Slide,
	ToggleButtonGroup,
	ToggleButton,
	ButtonGroup,
} from "@mui/material";
import { Close, Crop169, CropSquare, CropFree, Edit } from "@mui/icons-material";
import "react-image-crop/dist/ReactCrop.css";

const EditImageDialog = ({ image }) => {
	const aspectTypes = { landscape: 16 / 9, square: 1, free: undefined };
	const [open, setOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState("");
	const [crop, setCrop] = useState();
	const [aspect, setAspect] = useState("square");
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

		const base64Image = canvas.toDataURL("image/jpeg", 1);
		setOutput(base64Image);
	};

	const handleAspectChange = (e, newAspect) => {
		setAspect(newAspect);
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
					<Stack direction={"row"} spacing={2} sx={{ mb: 1 }}>
						<ToggleButtonGroup size="small" value={aspect} exclusive onChange={handleAspectChange}>
							<ToggleButton value="landscape">
								<Crop169 />
							</ToggleButton>
							<ToggleButton value="square">
								<CropSquare />
							</ToggleButton>
							<ToggleButton value="free">
								<CropFree />
							</ToggleButton>
						</ToggleButtonGroup>
						<ButtonGroup size="small">
							<Button disabled={!Boolean(crop)} onClick={cropImageNow}>
								Crop
							</Button>
							<Button>
								Reset
							</Button>
						</ButtonGroup>
					</Stack>
					<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
						<Box gridColumn="span 8">
							<Box sx={{ maxWidth: 900 }}>
								<ReactCrop crop={crop} onChange={setCrop} ruleOfThirds={true} aspect={aspectTypes[aspect]}>
									<Box component="img" src={`${imgSrc}`} alt={image.name} onLoad={onImageLoaded} />
								</ReactCrop>
							</Box>
						</Box>
						<Box gridColumn="span 4">
							<Typography>Preview</Typography>
							<div>{output && <img src={output} alt={image.name} />}</div>
						</Box>
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
