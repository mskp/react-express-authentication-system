/* Important Note:
This component represents the user's dashboard and demonstrates the impact of the useAxiosInterceptor hook.
The useAxiosInterceptor hook is invoked in the App Component, enabling this component to make authenticated
requests to the protected API endpoint. This ensures that the authentication header is consistently set for
secure communication with the server. Without the interceptor, requests to the protected route wouldn't have
included the necessary authentication header, leading to unauthorized access. 
*/
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../contexts/AuthContext";
import { SERVER_URL } from "../../constants";
import Loading from "../../components/Loading";

export default function Dashboard() {
  // React Router navigation hook
  const navigate = useNavigate();

  // State to manage loading state and API response message
  const [loading, setLoading] = useState(true);
  const [messageFromAPI, setMessageFromAPI] = useState("");

  // Context hook to manage authentication state
  const { setAuth } = useAuth();

  // Effect to fetch message from the protected API endpoint
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Make a GET request to the protected API endpoint
        // Possible only because of the invokation of useAxiosInterceptor hook in the App Component
        const { data } = await axios.get(`${SERVER_URL}/api/protected`);

        // Set the fetched message in the state
        setMessageFromAPI(data.message);
      } catch (error) {
        console.log(error.message);
      } finally {
        // Set loading to false once the request is complete
        setLoading(false);
      }
    };

    // Invoke the fetchMessage function
    fetchMessage();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    // Make a POST request to the logout endpoint
    await axios.post(`${SERVER_URL}/api/logout`, {}, { withCredentials: true });

    // Clear the authentication state
    setAuth({});

    // Redirect to the login page
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Loading />;
  }

  // JSX for the Dashboard component
  return (
    <section className="grid h-screen place-content-center bg-zinc-800 px-4 gap-4">
      <h1 className="text-gray-400 text-3xl">{messageFromAPI}</h1>
      <p className="text-2xl text-green-500 text-center">You're logged in</p>
      <button
        onClick={handleLogout}
        type="button"
        className="text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Logout
      </button>
    </section>
  );
}
