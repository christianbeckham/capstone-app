import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ImageList = ({ images, handleRemoveImage }) => {
	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
			}}
		>
			{images &&
				Object.values(images).map((img, index) => (
					<div key={img.name}>
						<ListItem
							secondaryAction={
								<IconButton edge="end" aria-label="delete" color="error" onClick={() => handleRemoveImage(index)}>
									<RemoveCircleIcon />
								</IconButton>
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
