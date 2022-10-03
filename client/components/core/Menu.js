import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link } from "react-router-dom";
import { withRouter } from "../hoc/withRouter";

const isActive = (router, path) => {
  if (router.location.pathname == path) {
    return { color: "#b40a43" };
  } else {
    return { color: "#fff" };
  }
};

export const Menu = withRouter(({ router }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Video Streaming App
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(router, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive(router, "/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(router, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button
                style={isActive(
                  router,
                  "/user/" + auth.isAuthenticated().user._id
                )}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => router.navigate("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});
