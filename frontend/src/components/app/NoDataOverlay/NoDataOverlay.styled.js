import { styled } from "@mui/material/styles";

export const StyledOverlay = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	backgroundColor: theme.palette.background.paper,
}));
