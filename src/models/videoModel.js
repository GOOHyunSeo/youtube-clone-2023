import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxlength: 80 },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  likes: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  description: { type: String },
  hashtags: [{ type: String, trim: true }],
  comments: { type: String },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
