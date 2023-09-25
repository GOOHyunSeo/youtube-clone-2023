import userModel from "../models/userModel";

export const getJoin = (req, res) => {
  return res.render("screens/join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, res) => {
  const { username, email, password, password2, name, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("screens/join", {
      pageTitle: "JOIN",
      err_message: "Password did not match.",
    });
  }
  const existUsername = await userModel.findOne({ username });
  if (existUsername) {
    return res.status(400).render("screens/join", {
      pageTitle: "JOIN",
      err_message: "This Username already exist.",
    });
  }
  const existEmail = await userModel.findOne({ email });
  if (existEmail) {
    return res.status(400).render("screens/join", {
      pageTitle: "JOIN",
      err_message: "This Email already exist.",
    });
  }
  await userModel.create({
    username,
    email,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};

export const login = (req, res) => res.send("loginUser");
export const seeProfile = (req, res) => res.send("profileUser");
export const logout = (req, res) => res.send("logoutUser");
export const edit = (req, res) => res.send("editUser");
export const deleteUser = (req, res) => res.send("deleteUser");
