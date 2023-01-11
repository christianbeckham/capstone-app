import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import useAuth from "../../../hooks/useAuth";

const UploadImagesButton = ({ checkinId, fetchCheckIn }) => {
	const { token } = useAuth();
	const [images, setImages] = useState([]);

	const handleImages = (e) => {
		setImages(e.target.files);
	};

	const handleUpload = () => {
		const form_data = new FormData();
		form_data.append("check_in_id", checkinId);
		if (images?.length > 0) {
			Object.values(images).forEach((img) => {
				form_data.append("images", img);
			});
		}
		postUpload(form_data);
	};

	const handleCancel = () => {
		setImages([]);
	};

	const postUpload = async (data) => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_WEBSITE_URL}/api/media/upload/`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 201) {
				fetchCheckIn();
				handleCancel();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
			{images?.length > 0 ? (
				<ButtonGroup variant="text" size="small" aria-label="upload button group">
					<Button onClick={handleUpload} color="primary">
						Upload {images?.length}
					</Button>
					<Button onClick={handleCancel} color="error">
						Cancel
					</Button>
				</ButtonGroup>
			) : (
				<Button color="primary" aria-label="upload picture" component="label" startIcon={<PhotoCamera />}>
					Upload
					<input hidden accept="image/png, image/jpeg" multiple type="file" onChange={handleImages} />
				</Button>
			)}
		</Box>
	);
};

export default UploadImagesButton;
