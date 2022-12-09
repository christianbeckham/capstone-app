export function remToPx(value) {
	return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
	return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
	return {
		"@media (min-width:600px)": {
			fontSize: pxToRem(sm),
		},
		"@media (min-width:900px)": {
			fontSize: pxToRem(md),
		},
		"@media (min-width:1200px)": {
			fontSize: pxToRem(lg),
		},
	};
}

const typography = {
	// Google Fonts CDN added to the <head> of public/index.html
	fontFamily: "Montserrat, sans-serif",
	fontWeightMedium: 700,
	fontWeightBold: 800,
	h1: {
		fontWeight: 800,
		fontSize: pxToRem(40),
		lineHeight: 80 / 64,
		...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
	},
	h2: {
		fontWeight: 800,
		fontSize: pxToRem(32),
		lineHeight: 64 / 48,
		...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
	},
	h3: {
		fontWeight: 800,
		fontSize: pxToRem(24),
		lineHeight: 1.5,
		...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
	},
	h4: {
		fontWeight: 800,
		fontSize: pxToRem(20),
		lineHeight: 1.5,
		...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
	},
	h5: {
		fontWeight: 800,
		fontSize: pxToRem(18),
		lineHeight: 1.5,
		...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
	},
	h6: {
		fontWeight: 700,
		fontSize: pxToRem(17),
		lineHeight: 28 / 18,
		...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
	},
	subtitle1: {
		fontSize: pxToRem(16),
		lineHeight: 1.5,
	},
	subtitle2: {
		fontSize: pxToRem(14),
		lineHeight: 22 / 14,
	},
	body1: {
		fontSize: pxToRem(16),
		lineHeight: 1.5,
	},
	body2: {
		fontSize: pxToRem(14),
		lineHeight: 22 / 14,
	},
	caption: {
		fontSize: pxToRem(12),
		lineHeight: 1.5,
	},
	overline: {
		fontSize: pxToRem(12),
		textTransform: "uppercase",
		lineHeight: 1.5,
	},
	button: {
		fontSize: pxToRem(14),
		textTransform: "capitalize",
		lineHeight: 24 / 14,
	},
};

export default typography;
