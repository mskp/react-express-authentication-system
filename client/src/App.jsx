// Importing necessary dependencies and components from React and React Router
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Protected Pages
import ProtectedPages from "./pages/ProtectedPages";
import Dashboard from "./pages/ProtectedPages/Dashboard.jsx";

// Auth Pages
import AuthPages from "./pages/AuthPages";
import Login from "./pages/AuthPages/Login.jsx";
import Signup from "./pages/AuthPages/Signup.jsx";

// Public Pages
import LandingPage from "./pages/PublicPages/LandingPage.jsx";

// Importing the custom hook for managing Axios interceptors
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

// Creating router
const router = createBrowserRouter([
  // Public Pages, i.e: (Pages that don't require user to be logged in. For Eg: Landing Page, About Page, etc)
  {
    path: "/",
    element: <LandingPage />,
  }, // Additional public pages can be added here

  // Pages that user can access only when they're logged in
  {
    element: <ProtectedPages />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // Pages that user can't access when they are logged in
  {
    element: <AuthPages />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

// Main App component
export default function App() {
  // Custom hook for setting up Axios interceptors to include access tokens in requests
  // Placed here to ensure interceptors are active as soon as the app starts
  useAxiosInterceptor();

  // Rendering the application
  return <RouterProvider router={router} />;
}
