import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/core/Home";
import { Menu } from "./components/core/Menu";
import { Signup } from "./components/user/Signup";
import { Signin } from "./components/auth/Signin";
import { Profile } from "./components/user/Profile";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { EditProfile } from "./components/user/EditProfile";
import { NewVideo } from "./components/media/NewVideo";
import { Media } from "./components/media/Media";
import { EditMedia } from "./components/media/EditMedia";

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

        <Route
          path="/media/new"
          element={
            <PrivateRoute>
              <NewVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/media/edit/:mediaId"
          element={
            <PrivateRoute>
              <EditMedia />
            </PrivateRoute>
          }
        />
        <Route path="/media/:mediaId" element={<Media />} />
      </Routes>
    </div>
  );
};
