import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import ReactPlayer from "react-player";
import auth from "./../auth/auth-helper";
import { read } from "./api-media.js";
import { DeleteMedia } from "./DeleteMedia";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "20px",
  },
  header: {
    padding: "0px 16px 16px 12px",
  },
  action: {
    margin: "24px 20px 0px 0px",
    display: "inline-block",
    fontSize: "1.15em",
    color: theme.palette.secondary.dark,
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
}));

export const Media = () => {
  const [media, setMedia] = useState({});
  const [error, setError] = useState("");
  const { mediaId } = useParams();
  const classes = useStyles();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ mediaId }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMedia(data);
      }
    });
    // return function cleanup() {
    //   abortController.abort();
    // };
  }, [mediaId]);

  const mediaUrl = media._id ? `/api/media/video/${media._id}` : null;
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={media?.title}
        action={
          <span className={classes.action}>{`${media?.views} views`}</span>
        }
        subheader={media?.genre}
      />
      <ReactPlayer
        url={mediaUrl}
        controls
        width="inherit"
        height="inherit"
        style={{ maxHeight: "100%" }}
        config={{ attributes: { style: { height: "100%", width: "100%" } } }}
      />
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>{media?.postedBy?.name}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={media?.postedBy?.name}
            secondary={
              "Published on " + new Date(media?.created).toDateString()
            }
          />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == media?.postedBy?._id && (
              <ListItemSecondaryAction>
                <Link to={`/media/edit/${media?._id}`}>
                  <IconButton aria-label="Edit" color="secondary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteMedia mediaId={media?._id} mediaTitle={media?.title} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={media?.description} />
        </ListItem>
      </List>
    </Card>
  );
};

Media.propTypes = {
  media: PropTypes.object,
};
