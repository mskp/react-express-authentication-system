// Importing necessary dependencies
import axios from "axios";
import { SERVER_URL } from "../constants";
import useAuth from "../contexts/AuthContext";

// Custom hook for handling token refresh
export default function useRefreshToken() {
    // Destructuring the 'setAuth' function from the 'useAuth' hook
    const { setAuth } = useAuth();

    // function for refreshing the token
    return async () => {
        try {
            // Making a POST request to the server to refresh the token
            const response = await axios.post(`${SERVER_URL}/api/refresh`, {}, { withCredentials: true });

            // Extracting the new access token from the response
            const accessToken = response.data?.accessToken ?? "";

            // Updating the authentication context with the new access token
            setAuth(accessToken ? { accessToken } : {});

            // Returning the new access token
            return accessToken;
        } catch (error) {
            // Logging any errors that occur during the token refresh process
            console.log(error);
        }
    };
}
