export const home = (req, res) => res.send("home");
export const search = (req, res) => res.send("searchVideo");
export const setting = (req, res) => res.send("setting");
export const upload = (req, res) => res.send("uploadVideo");
export const watch = (req, res) => {
  console.log(req.params.id);
  return res.send("watch");
};
export const edit = (req, res) => res.send("editVideo");
export const deleteVideo = (req, res) => res.send("deleteVideo");
