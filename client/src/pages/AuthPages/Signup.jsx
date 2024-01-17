import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

// Component for user signup
export default function Signup() {
  // State to manage user input
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle input change
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  // Function to validate user input
  const validateUserInfo = () => {
    const { fullName, email, password, confirmPassword } = userInfo;

    // Check if name length is greater than 5
    if (fullName.length < 6) {
      toast.error("Full name should be at least 6 characters long", {
        id: "error-toast",
      });
      return false;
    }

    // Check if email is in proper format
    if (email.trim().length === 0) {
      toast.error("Please enter email", { id: "error-toast" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", { id: "error-toast" });
      return false;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long", {
        id: "error-toast",
      });
      return false;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { id: "error-toast" });
      return false;
    }

    // If all checks pass, return true
    return true;
  };

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate user input
    const isValid = validateUserInfo();

    // If input is valid, proceed with signup
    if (isValid) {
      try {
        // Send a signup request to the server
        const response = await axios.post(`${SERVER_URL}/api/signup`, userInfo);

        // Redirect to login page on successful signup
        navigate("/login", { replace: true });

        // Display success toast
        toast.success(response.data.message, { id: "success-toast" });
      } catch (error) {
        console.log(error.message);
        // Display error toast if signup fails
        toast.error("Account couldn't be created", { id: "error-toast" });
      }
    }
  };

  // JSX for the Signup component
  return (
    <section className="bg-zinc-800 p-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-zinc-900 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  onChange={handleChange}
                  value={userInfo.fullName}
                />
              </div>
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
                  onChange={handleChange}
                  value={userInfo.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  value={userInfo.password}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium "
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  value={userInfo.confirmPassword}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  replace
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
