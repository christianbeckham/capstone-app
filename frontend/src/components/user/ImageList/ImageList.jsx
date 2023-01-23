import React from "react";
import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

import EditImageDialog from "../EditImageDialog/EditImageDialog";

const ImageList = ({ images, handleRemoveImage }) => {
	return (
		<List
			sx={{
				width: "100%",
				bgcolor: "background.paper",
			}}
		>
			{images &&
				Object.values(images).map((img, index) => (
					<div key={img.name}>
						<ListItem
							secondaryAction={
								<Box sx={{ display: "flex" }}>
									<EditImageDialog image={img} />
									<IconButton edge="end" aria-label="delete" color="error" onClick={() => handleRemoveImage(index)}>
										<RemoveCircle />
									</IconButton>
								</Box>
							}
						>
							<ListItemAvatar>
								<Avatar src={URL.createObjectURL(img)} variant="rounded" sx={{}} />
							</ListItemAvatar>
							<ListItemText primary={img.name} />
						</ListItem>
						{images.length !== index && <Divider variant="inset" component="li" />}
					</div>
				))}
		</List>
	);
};

export default ImageList;
