import { useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<Container component={"main"} maxWidth="xs">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</Container>
	);
};

export default ErrorPage;
