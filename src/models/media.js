import mongoose from "mongoose";
const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  genre: String,
  views: { type: Number, default: 0 },
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

export const Media = mongoose.model("Media", MediaSchema);
