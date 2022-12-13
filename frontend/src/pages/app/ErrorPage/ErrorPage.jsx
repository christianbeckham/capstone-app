import { Link, useRouteError } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<Container
			component={"main"}
			maxWidth="xs"
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Stack alignItems="center" justifyContent="center" spacing={1}>
				<Typography component="h1" variant="h1">
					Oops!
				</Typography>
				<Typography component="p" variant="body1">
					Sorry, an unexpected error has occurred.
				</Typography>
				<Stack direction="row" spacing={1} sx={{ py: 3 }}>
					{error?.status && (
						<Typography component="p" variant="body2">
							<i>{error?.status}</i>
						</Typography>
					)}
					{(error?.statusText || error?.message) && (
						<Typography component="p" variant="body2">
							<i>{error.statusText || error.message}</i>
						</Typography>
					)}
				</Stack>
				<Button component={Link} to={"/"} variant="contained">
					Go to home
				</Button>
			</Stack>
		</Container>
	);
};

export default ErrorPage;
