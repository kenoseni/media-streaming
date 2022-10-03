import React, { useState, useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import { DeleteUser } from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: {},
    redirectToSignin: false,
  });
  const jwt = auth.isAuthenticated();

  const { userId } = useParams();

  useEffect(async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const data = await read({ userId }, { t: jwt.token }, signal);
    if (data && data.error) {
      setValues({ ...values, redirectToSignin: true });
    } else {
      setValues({ ...values, user: data });
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  if (values.redirectToSignin) {
    return <Navigate to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl}>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={values.user.name}
            secondary={values.user.email}
          />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == values.user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${values.user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={values.user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={values.user.about}
            secondary={
              "Joined: " + new Date(values.user.created).toDateString()
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
};
