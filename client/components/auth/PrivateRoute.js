import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth-helper";

export const PrivateRoute = ({ children }) =>
  auth.isAuthenticated() ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
        state: { from: useLocation() },
      }}
    />
  );
