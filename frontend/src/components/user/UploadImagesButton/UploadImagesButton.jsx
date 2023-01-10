import React, { useState } from "react";
import axios from "axios";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import useAuth from "../../../hooks/useAuth";

const UploadImagesButton = ({ checkinId, fetchCheckIn }) => {
	const { token } = useAuth();
	const [images, setImages] = useState(null);

	const handleImages = (e) => {
		setImages(e.target.files);
	};

	const handleUpload = () => {
		const form_data = new FormData();
		form_data.append("check_in_id", checkinId);
		if (images != null) {
			Object.values(images).forEach((img) => {
				form_data.append("images", img);
			});
		}
		postUpload(form_data);
	};

	const handleCancel = () => {
		setImages(null);
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
		<div>
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
				<IconButton color="primary" aria-label="upload picture" component="label">
					<input hidden accept="image/png, image/jpeg" multiple type="file" onChange={handleImages} />
					<PhotoCamera />
				</IconButton>
			)}
		</div>
	);
};

export default UploadImagesButton;
