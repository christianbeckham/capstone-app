import { GlobalStyles } from "@mui/material";

const GlobalAppStyles = () => {
	return (
		<GlobalStyles
			styles={{
				"*": {
					margin: 0,
					padding: 0,
					boxSizing: "inherit",
				},
				html: {
					boxSizing: "border-box",
					width: "100%",
					height: "100%",
					WebkitOverflowScrolling: "touch",
				},
				body: {
					margin: 0,
					padding: 0,
					width: "100%",
					height: "100%",
				},
				"#root": {
					width: "100%",
					height: "100%",
				},
				input: {
					"&[type=number]": {
						MozAppearance: "textfield",
						"&::-webkit-outer-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
						"&::-webkit-inner-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
					},
				},
				img: {
					display: "block",
					maxWidth: "100%",
				},
				ul: {
					margin: 0,
					padding: 0,
				},
			}}
		/>
	);
};

export default GlobalAppStyles;
