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

export default { create };
