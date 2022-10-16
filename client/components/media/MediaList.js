import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageListItem from "@material-ui/core/ImageListItem";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
    textAlign: "left",
    padding: "8px 16px",
  },
  gridList: {
    width: "100%",
    minHeight: 180,
    padding: "0px 0 10px",
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    width: "100%",
  },
  tile: {
    textAlign: "center",
    maxHeight: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
    height: "55px",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "rgb(193, 173, 144)",
    display: "block",
  },
  tileGenre: {
    float: "right",
    color: "rgb(193, 182, 164)",
    marginRight: "8px",
  },
}));

export const MediaList = ({ videos }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageList className={classes.gridList} cols={3}>
        {videos.map((video, i) => (
          <ImageListItem key={i} className={classes.tile}>
            <Link to={`/media/${video._id}`}>
              <ReactPlayer
                url={`/api/media/video/${video._id}`}
                width="100%"
                height="inherit"
                style={{ maxHeight: "100%" }}
              />
            </Link>
            <ImageListItemBar
              className={classes.tileBar}
              title={
                <Link
                  to={{ pathname: `/media/${video._id}` }}
                  className={classes.tileTitle}
                >
                  {" "}
                  {video.title}{" "}
                </Link>
              }
              subtitle={
                <span>
                  <span>{video.views} views</span>
                  <span className={classes.tileGenre}>
                    <em>{video.genre}</em>
                  </span>
                </span>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
MediaList.propTypes = {
  videos: PropTypes.array.isRequired,
};
