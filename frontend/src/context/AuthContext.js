import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

const setUserObject = (user) => {
	if (!user) return null;
	return {
		username: user.username,
		id: user.user_id,
		first_name: user.first_name,
		last_name: user.last_name,
		is_client: user.is_client,
		is_admin: user.is_admin,
	};
};

export const AuthProvider = ({ children }) => {
	const BASE_URL = "http://127.0.0.1:8000/api/auth";
	const userToken = JSON.parse(localStorage.getItem("token"));
	const decodedUser = userToken ? jwtDecode(userToken) : null;

	const [token, setToken] = useState(userToken);
	const [user, setUser] = useState(setUserObject(decodedUser));
	const [isServerError, setIsServerError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const registerUser = async (registerData) => {
		try {
			setIsLoading(true);
			const finalData = {
				username: registerData.username,
				password: registerData.password,
				email: registerData.email,
				first_name: registerData.firstName,
				last_name: registerData.lastName,
			};
			const response = await axios.post(`${BASE_URL}/register/`, finalData);
			if (response.status === 201) {
				console.log("Successful registration! Log in to access token");
				setIsServerError(false);
				setIsLoading(false);
				navigate("/login", { replace: true });
			}
		} catch (error) {
			setIsServerError(true);
			setIsLoading(false);
		}
	};

	const loginUser = async (loginData) => {
		try {
			setIsLoading(true);
			const response = await axios.post(`${BASE_URL}/login/`, loginData);
			if (response.status === 200) {
				localStorage.setItem("token", JSON.stringify(response.data.access));
				setToken(JSON.parse(localStorage.getItem("token")));
				const loggedInUser = jwtDecode(response.data.access);
				setUser(setUserObject(loggedInUser));
				setIsServerError(false);
			}
			setIsLoading(false);
		} catch (error) {
			setIsServerError(true);
			setIsLoading(false);
		}
	};

	const logoutUser = () => {
		if (user) {
			localStorage.removeItem("token");
			setUser(null);
			setToken(null);
			navigate("/", { replace: true });
		}
	};

	const contextData = {
		user,
		token,
		loginUser,
		logoutUser,
		registerUser,
		isServerError,
		setIsServerError,
		isLoading,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
