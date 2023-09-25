import userModel from "../models/userModel";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("screens/join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, res) => {
  const { username, email, password, password2, name, location } = req.body;
  const pageTitle = "JOIN";
  if (password !== password2) {
    return res.status(400).render("screens/join", {
      pageTitle,
      err_message: "Password did not match.",
    });
  }
  const existUsername = await userModel.findOne({ username });
  if (existUsername) {
    return res.status(400).render("screens/join", {
      pageTitle,
      err_message: "This Username already exist.",
    });
  }
  const existEmail = await userModel.findOne({ email });
  if (existEmail) {
    return res.status(400).render("screens/join", {
      pageTitle,
      err_message: "This Email already exist.",
    });
  }
  try {
    await userModel.create({
      username,
      email,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .render("screens/upload", { pageTitle: "UPLOAD", err });
  }
};

export const getLogin = (req, res) => {
  return res.render("screens/login", { pageTitle: "LOGIN" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "LOGIN";
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).render("screens/login", {
      pageTitle,
      err_message: "This Username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  console.log(ok);
  if (!ok) {
    return res.status(400).render("screens/login", {
      pageTitle,
      err_message: "This Password is wrong.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const seeProfile = (req, res) => res.send("profileUser");
export const logout = (req, res) => res.send("logoutUser");
export const edit = (req, res) => res.send("editUser");
export const deleteUser = (req, res) => res.send("deleteUser");
