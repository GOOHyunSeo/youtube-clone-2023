export const home = (req, res) => {
  const videos = [
    {
      title: "ONE",
      rating: 5,
      comments: 2,
      createdAt: "3min ago",
      id: 1,
    },
    { title: "22222", rating: 5, comments: 1, createdAt: "3min ago", id: 2 },
    { title: "THREEEEE", rating: 5, comments: 2, createdAt: "3min ago", id: 3 },
  ];
  return res.render("screens/home", { pageTitle: "HOME", videos });
};
export const search = (req, res) => res.send("searchVideo");
export const setting = (req, res) => res.send("setting");
export const upload = (req, res) => res.send("uploadVideo");
export const watch = (req, res) => {
  return res.render("screens/watch", { pageTitle: "WATCH" });
};
export const edit = (req, res) => res.send("editVideo");
export const deleteVideo = (req, res) => res.send("deleteVideo");
