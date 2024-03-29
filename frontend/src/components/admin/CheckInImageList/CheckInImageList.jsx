import React from "react";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from "@mui/material";

import CheckInImageListActions from "../CheckInImageListActions/CheckInImageListActions";

const CheckInImageList = ({ images }) => {
	return (
		<List sx={{ width: "100%" }}>
			{images &&
				images.map((img) => (
					<div key={img.id}>
						<ListItem secondaryAction={<CheckInImageListActions image={img} />}>
							<ListItemAvatar>
								<Avatar src={`${process.env.REACT_APP_WEBSITE_URL}${img.image}`} variant="rounded" />
							</ListItemAvatar>
							<ListItemText primary={`${img.image.split("/").slice(-1)}`} />
						</ListItem>
						<Divider variant="inset" component="li" />
					</div>
				))}
		</List>
	);
};

export default CheckInImageList;
