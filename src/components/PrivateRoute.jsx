import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // Access user authentication state from Redux store
  const { user } = useSelector((state) => state.auth); //Reads user from the auth slice of the Redux store using useSelector.

  // Check if token exists in localStorage (fallback if Redux state is lost)
  const token = localStorage.getItem("token");

  // If no user or token → redirect to login
  if (!user && !token) {
    return <Navigate to="/login" replace />;//replace means the redirect replaces the current history entry (so pressing back won’t return to the protected route).
  }

  // If there is a user (or a token), the function returns children, letting the protected UI render.
  return children; 
};

export default PrivateRoute;
