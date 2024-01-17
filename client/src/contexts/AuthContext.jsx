import React from "react";

// Creating an authentication context
const AuthContext = React.createContext(null);

// Creating an authentication provider component
export const AuthProvider = ({ children }) => {
  // Using state to manage authentication information
  const [auth, setAuth] = React.useState({});

  // Providing the authentication state and setter to the context
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the authentication context
export default function useAuth() {
  return React.useContext(AuthContext);
}
