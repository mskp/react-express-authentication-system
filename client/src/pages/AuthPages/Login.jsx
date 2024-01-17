import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../constants";
import toast from "react-hot-toast";
import useAuth from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Component for user login
export default function Login() {
  // State to manage user input
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // Context hook to manage authentication state
  const { setAuth } = useAuth();

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle input change
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (userInfo.email.trim() && userInfo.password.trim()) {
      try {
        // Send login request to the server
        const response = await axios.post(`${SERVER_URL}/api/login`, userInfo, {
          withCredentials: true,
        });

        if (response.status === 200) {
          // Set authentication state with the received access token
          setAuth(response.data.accessToken);

          // Redirect to the dashboard on successful login
          navigate("/dashboard", { replace: true });

          // Display success toast
          toast.success("Successfully logged in", { id: "success-toast" });
        }
      } catch (error) {
        console.log(error.message);

        // Display error toast on invalid credentials
        toast.error("Invalid Credentials", { id: "error-toast" });
      }
    }
  };

  // JSX for the Login component

  return (
    <section className="bg-zinc-800 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-zinc-900 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  value={userInfo.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg text-black focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                  value={userInfo.password}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  replace
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
