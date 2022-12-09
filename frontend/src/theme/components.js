import { alpha } from "@mui/material/styles";

export const appComponents = (theme) => ({
	MuiAppBar: {
		defaultProps: {
			elevation: 0,
		},
		styleOverrides: {
			root: {
				"&.MuiAppBar-colorDefault": {
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
				},
			},
		},
	},
	MuiAvatar: {
		styleOverrides: {
			root: {
				color: "inherit",
				backgroundColor: theme.palette.background.default,
			},
		},
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true,
		},
		styleOverrides: {
			root: {
				paddingTop: 8,
				paddingBottom: 8,
				paddingLeft: 16,
				paddingRight: 16,
			},
			label: {
				fontWeight: theme.typography.fontWeightMedium,
			},
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				padding: theme.spacing(3),
				borderRadius: Number(theme.shape.borderRadius) * 2,
				position: "relative",
				zIndex: 0, // Fix Safari overflow: hidden with border radius
			},
		},
	},
	MuiCardHeader: {
		defaultProps: {
			titleTypographyProps: { variant: "h6" },
			subheaderTypographyProps: { variant: "body2" },
		},
		styleOverrides: {
			root: {
				padding: theme.spacing(3, 3, 0),
			},
		},
	},
	MuiCardContent: {
		styleOverrides: {
			root: {
				padding: theme.spacing(3),
			},
		},
	},
	MuiCardActions: {
		styleOverrides: {
			root: {
				justifyContent: "flex-end",
				padding: "0 24px 24px 24px",
			},
		},
	},
	MuiChip: {
		styleOverrides: {
			label: {
				fontWeight: theme.typography.fontWeightMedium,
			},
		},
	},
	MuiDialogActions: {
		styleOverrides: {
			root: {
				padding: 24,
			},
		},
	},
	MuiDialogTitle: {
		styleOverrides: {
			root: {
				padding: 24,
				"& .MuiTypography-root": {
					fontSize: "1.25rem",
				},
			},
		},
	},
	MuiDrawer: {
		styleOverrides: {
			paper: {
				border: "none; !important",
			},
		},
	},
	MuiFilledInput: {
		defaultProps: {
			disableUnderline: true,
		},
		styleOverrides: {
			root: {
				borderRadius: 8,
				backgroundColor: alpha(theme.palette.grey[500], 0.12),
				"&:hover": {
					backgroundColor: alpha(theme.palette.grey[500], 0.16),
				},
				"&.Mui-focused": {
					backgroundColor: theme.palette.action.focus,
				},
				"&.Mui-disabled": {
					backgroundColor: theme.palette.action.disabledBackground,
				},
			},
			underline: {
				"&:before": {
					borderBottomColor: alpha(theme.palette.grey[500], 0.56),
				},
			},
		},
	},
	MuiInputBase: {
		styleOverrides: {
			root: {
				"&.Mui-disabled": {
					"& svg": { color: theme.palette.text.disabled },
				},
			},
			input: {
				"&::placeholder": {
					opacity: 1,
					color: theme.palette.text.disabled,
				},
			},
		},
	},
	MuiInput: {
		styleOverrides: {
			underline: {
				"&:before": {
					borderBottomColor: alpha(theme.palette.grey[500], 0.56),
				},
			},
		},
	},
	MuiList: {
		defaultProps: {
			dense: true,
		},
	},
	MuiListItem: {
		styleOverrides: {
			root: {
				"&.Mui-selected": {
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
				},
			},
		},
	},
	MuiListItemButton: {
		styleOverrides: {
			root: {
				height: 50,
				borderRadius: 8,
				justifyContent: "center",
				// backgroundColor: "red",
			},
		},
	},
	MuiListItemIcon: {
		styleOverrides: {
			root: {
				justifyContent: "center",
			},
		},
	},
	MuiMenu: {
		styleOverrides: {
			list: {
				// marginRight: 8,
				// marginLeft: 8,
			},
		},
	},
	MuiMenuItem: {
		styleOverrides: {
			root: {
				paddingTop: 12,
				paddingBottom: 12,
			},
		},
	},
	MuiOutlinedInput: {
		styleOverrides: {
			root: {
				"& .MuiOutlinedInput-notchedOutline": {
					borderColor: alpha(theme.palette.grey[500], 0.32),
				},
				"&.Mui-disabled": {
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.action.disabledBackground,
					},
				},
			},
			input: {
				"&:-webkit-autofill": {
					WebkitBoxShadow: `0 0 0 30px ${theme.palette.background.paper} inset`,
				},
			},
		},
	},
	MuiPaper: {
		defaultProps: {
			elevation: 0,
		},
		styleOverrides: {
			root: {
				backgroundImage: "none",
			},
		},
	},
	MuiTab: {
		styleOverrides: {
			root: {
				borderRadius: 8,
				paddingTop: 10,
				paddingBottom: 10,
				paddingLeft: 16,
				paddingRight: 16,
				maxWidth: "initial !important",
				minHeight: "initial !important",
				minWidth: "initial !important",
				textTransform: "none",
				"&.Mui-selected": {
					color: theme.palette.text.primary,
				},
			},
		},
	},
	MuiTableCell: {
		styleOverrides: {
			root: {
				borderBottom: `1px solid ${theme.palette.divider}`,
				padding: "24px 16px",
			},
			head: {
				color: theme.palette.text.secondary,
				backgroundColor: theme.palette.background.default,
			},
			sizeSmall: {
				padding: "12px 16px",
			},
		},
	},
	MuiTypography: {
		styleOverrides: {
			paragraph: {
				marginBottom: theme.spacing(2),
			},
			gutterBottom: {
				marginBottom: theme.spacing(1),
			},
		},
	},
});
