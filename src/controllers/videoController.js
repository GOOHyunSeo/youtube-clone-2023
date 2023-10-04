import videoModel from "../models/videoModel";
import userModel from "../models/userModel";

export const home = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" });
  return res.render("screens/home", { pageTitle: "HOME", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("screens/watch", { pageTitle: "WATCH", video });
};

export const getUpload = (req, res) => {
  return res.render("screens/upload", { pageTitle: "UPLOAD" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file,
    session: {
      user: { _id },
    },
  } = req;
  try {
    const newVideo = await videoModel.create({
      videoUrl: file.path,
      title,
      description,
      hashtags: videoModel.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await userModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .render("screens/upload", { pageTitle: "UPLOAD", err });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(req.session.user._id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  return res.render("screens/edit", {
    pageTitle: `EDIT`,
    video,
  });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(req.session.user._id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { _id } = req.session.user;
  const { id } = req.params;
  const video = await videoModel.findById(id);
  const user = await userModel.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(_id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  let message;
  if (keyword) {
    videos = await videoModel.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
    if (videos.length === 0) {
      console.log("no data found");
      message = "NO DATA FOUND";
    }
  }
  return res.render("screens/search", { pageTitle: "SEARCH", videos, message });
};

export const setting = (req, res) => res.send("setting");

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.views = video.views + 1;
  await video.save();
  return res.sendStatus(200);
};
