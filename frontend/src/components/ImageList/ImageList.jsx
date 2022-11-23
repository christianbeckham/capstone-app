import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

const ImageList = ({ images }) => {
	return (
		<div>
			<Typography component={"h3"} variant="h6" sx={{ pt: 3 }}>
				Images
			</Typography>
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
							<ListItem>
								<ListItemAvatar>
									<Avatar
										src={URL.createObjectURL(img)}
										variant="rounded"
										sx={{ height: "auto" }}
									/>
								</ListItemAvatar>
								<ListItemText primary={img.name} />
							</ListItem>
							{images.length !== index && (
								<Divider variant="inset" component="li" />
							)}
						</div>
					))}
			</List>
		</div>
	);
};

export default ImageList;
