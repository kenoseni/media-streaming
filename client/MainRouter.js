import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/core/Home";
import { Menu } from "./components/core/Menu";
import { Signup } from "./components/user/Signup";
import { Signin } from "./components/auth/Signin";
import { Profile } from "./components/user/Profile";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { EditProfile } from "./components/user/EditProfile";

export const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
};
