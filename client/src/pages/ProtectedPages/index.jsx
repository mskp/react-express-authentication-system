import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import useRefreshToken from "../../hooks/useRefreshToken";

export default function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refreshAccessToken = useRefreshToken();
  const timeoutId = useRef(null);

  useEffect(() => {
    // Function to verify and refresh the access token
    const verifyAndRefresh = async () => {
      try {
        // Attempt to refresh the access token
        await refreshAccessToken();
      } catch (error) {
        // Log an error message if refreshing fails
        console.error("Error refreshing token:", error.message || error);
      } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);

        // Set the timeout for the next refresh (28 minutes in milliseconds)
        const nextRefreshTimeout = 28 * 60 * 1000;
        timeoutId.current = setTimeout(verifyAndRefresh, nextRefreshTimeout);
      }
    };

    // Initial call to start the token refresh process
    verifyAndRefresh();

    // Cleanup function: Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId.current);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  // If still loading, render a loading indicator
  if (isLoading) {
    return <Loading />;
  } else if (!auth.accessToken) {
    // If there is no access token, navigate to the login page
    return <Navigate to="/login" replace />;
  }

  // If not loading and the access token is present, render the child routes
  return <Outlet />;
}
