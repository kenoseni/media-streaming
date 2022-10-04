import mongoose from "mongoose";
import fs from "fs";
import formidable from "formidable";
import errorHandler from "../helpers/error-handler";
import { Media } from "../models/media";

let gridFs = null;
mongoose.connection.on("connected", () => {
  gridFs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "media",
  });
});

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }
    let media = new Media(fields);
    media.postedBy = req.profile;
    if (files.video) {
      // Returns a writable stream (GridFSBucketWriteStream)
      // for writing buffers to GridFS.
      // The stream's 'id' property contains the resulting file's id.
      let writestream = gridFs.openUploadStream(media._id, {
        contentType: files.video.mimetype || "binary/octet-stream",
      });
      fs.createReadStream(files.video.filepath).pipe(writestream);
    }
    try {
      let result = await media.save();
      res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const mediaById = async (req, res, next, id) => {
  try {
    let media = await Media.findById(id)
      .populate("postedBy", "_id name")
      .exec();
    if (!media) {
      return res.status(404).json({
        error: "Media not found",
      });
    }
    req.media = media;
    const files = await gridFs.find({ filename: media._id }).toArray();

    if (!files[0]) {
      return res.status(404).send({
        error: "No video found",
      });
    }
    req.file = files[0];
    next();
  } catch (error) {
    return res.status(404).send({
      error: "Could not retrieve media file",
    });
  }
};

const video = (req, res) => {
  const range = req.headers["range"];

  if (range && typeof range === "string") {
    // consider range header and send only relevant chunks in response
    const parts = range.replace(/bytes=/, "").split("-");
    const partialStart = parts[0];
    const partialEnd = parts[1];

    //These start and end values specify the 0-based offset in bytes to
    // start streaming from and stop streaming before.
    const start = parseInt(partialStart, 10);
    const end = partialEnd ? parseInt(partialEnd, 10) : req.file.length - 1;

    const chunkSize = end - start + 1;

    res.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": req.file.contentType,
      "Content-Range": `bytes ${start}-${end}/${req.file.length}`,
    });

    let downloadStream = gridFs.openDownloadStream(req.file._id, {
      start,
      end: end + 1,
    });
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } else {
    res.header("Content-Length", req.file.length);
    res.header("Content-Type", req.file.contentType);
    let downloadStream = gridFs.openDownloadStream(req.file._id);
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  }
};

const getPopularVideos = async (req, res) => {
  try {
    let media = await Media.find({})
      .limit(12)
      .populate("postedBy", "_id name")
      .sort("-views")
      .exec();
    res.json(media);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, mediaById, video, getPopularVideos };
