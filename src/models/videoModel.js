import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  owner: { type: String },
  likes: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  description: { type: String, trim: true, minlength: 5 },
  hashtags: [{ type: String, trim: true }],
  comments: { type: String },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;