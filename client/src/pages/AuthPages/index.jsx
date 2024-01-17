/* AuthPages Component:
This component serves as a gatekeeper for routes that require authentication.
It checks the authentication state using the useAuth context and the presence
of an access token. If an access token is available, the user is redirected to
the dashboard. If not, the component attempts to refresh the token using the
useRefreshToken hook, ensuring a seamless and secure user experience. The Loading
component is displayed while the authentication state is being determined or the
token is being refreshed. If authentication fails, the user is allowed to access
the login and signup pages via the Outlet. 
*/

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import Loading from "../../components/Loading";

function AuthPages() {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Context hook to manage authentication state
  const { auth } = useAuth();

  // Hook for refreshing the access token
  const refresh = useRefreshToken();

  // Access token obtained from the context
  const accessToken = auth?.accessToken;

  // Effect to check and refresh the token if necessary
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // If no access token is present, attempt to refresh it
    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // Render Loading component while determining authentication state
  if (isLoading) return <Loading />;

  // Redirect to dashboard if access token is present
  if (accessToken) return <Navigate to="/dashboard" replace={true} />;

  // Render the nested routes via Outlet if not authenticated
  return <Outlet />;
}

export default AuthPages;
