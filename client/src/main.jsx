// Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Importing the AuthProvider from the authentication context
import { AuthProvider } from "./contexts/AuthContext";

// Importing the Toast component for displaying notifications
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
