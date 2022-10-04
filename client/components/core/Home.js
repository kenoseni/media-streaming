import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { MediaList } from "../media/MediaList";
import { getPopularVideos } from "../media/api-media";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px 0px`,
    color: theme.palette.text.secondary,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  useEffect(async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const data = await getPopularVideos(signal);
    if (data.error) {
      console.log(data.error);
    } else {
      setVideos(data);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Card className={classes.card}>
      <Typography variant="h2" className={classes.title}>
        Popular Videos
      </Typography>
      <MediaList videos={videos} />
    </Card>
  );
};
