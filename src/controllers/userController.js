import userModel from "../models/userModel";
import videoModel from "../models/videoModel";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("screens/join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, res) => {
  const { name, email, password, password2, location } = req.body;
  const pageTitle = "JOIN";
  if (password !== password2) {
    return res.status(400).render("screens/join", {
      pageTitle,
      err_message: "Password did not match.",
    });
  }
  const existName = await userModel.findOne({ name });
  if (existName) {
    return res.status(400).render("screens/join", {
      pageTitle,
      err_message: "This Name already exist.",
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
      name,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .render("screens/join", { pageTitle: "JOIN", err_message: err });
  }
};

export const getLogin = (req, res) => {
  return res.render("screens/login", { pageTitle: "LOGIN" });
};
export const postLogin = async (req, res) => {
  const { name, password } = req.body;
  const pageTitle = "LOGIN";
  const userSocialOnly = await userModel.findOne({ name, socialOnly: true });
  if (userSocialOnly) {
    return res.status(400).render("screens/login", {
      pageTitle,
      err_message: "This Name is created in Google Acount",
    });
  }
  const user = await userModel.findOne({ name, socialOnly: false });
  if (!user) {
    return res.status(400).render("screens/login", {
      pageTitle,
      err_message: "This Name does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
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

export const startGoogleLogin = (req, res) => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "email profile",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGoogleLogin = async (req, res) => {
  const baseUrl = "https://oauth2.googleapis.com/token";
  const config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    let user = await userModel.findOne({ email: userRequest.email });
    if (!user) {
      //해당 이메일로 existingUser 없을때
      user = await userModel.create({
        name: userRequest.name,
        email: userRequest.email,
        password: "",
        location: userRequest.locale,
        socialOnly: true,
        pictureUrl: userRequest.picture,
      });
    } else {
      //해당 이메일로 existingUser 있을때
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    //"access_token" in tokenRequest 없을때
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("screens/edit-profile", { pageTitle: "EDIT PROFILE" });
};
export const postEdit = async (req, res) => {
  const pageTitle = "EDIT PROFILE";
  const {
    session: {
      user: { _id, pictureUrl },
    },
    body: { name, email, location },
    file,
  } = req;
  if (req.session.user.name !== name) {
    const existName = await userModel.findOne({ name });
    if (existName) {
      return res.status(400).render("screens/edit-profile", {
        pageTitle,
        err_message: "This Name already exist.",
      });
    }
  }
  if (req.session.user.email !== email) {
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).render("screens/edit-profile", {
        pageTitle,
        err_message: "This Email already exist.",
      });
    }
  }
  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      location,
      pictureUrl: file ? file.path : pictureUrl,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Loggednin Google Account. Can't change Password.");
    return res.redirect("/");
  }
  return res.render("screens/change-password", { pageTitle: "CHANGE PW" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await userModel.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("screens/change-password", {
      pageTitle: "CHANGE PW",
      err_message: "Old Password is incorrect.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("screens/change-password", {
      pageTitle: "CHANGE PW",
      err_message: "Password did not match.",
    });
  }
  user.password = newPassword;
  await user.save();
  req.session.destroy();
  return res.redirect("/login");
};

export const seeProfile = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id).populate("videos");
  if (!user) {
    req.flash("error", "User does not exist.");
    return res.status(404).render("404", { pageTitle: "User Not Found" });
  }
  return res.render("screens/profile", {
    pageTitle: `${user.name}'s PROFILE`,
    user,
  });
};
export const deleteUser = (req, res) => res.send("deleteUser");
